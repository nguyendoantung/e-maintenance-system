import email.utils
import json
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

import jinja2
from dotenv import load_dotenv

send_user = ""

load_dotenv()


class SendEmailController:
    def __init__(self):
        pass

    @staticmethod
    def render_mail_template(template_params, template_name):
        html_template_url = Path(__file__).parents[1] / "mail_templates"
        html_template_loader = jinja2.FileSystemLoader(html_template_url)
        html_template = jinja2.Environment(loader=html_template_loader)
        email_template = html_template.get_template(template_name)

        compose_email_html = email_template.render(template_params)
        return compose_email_html

    @staticmethod
    def config_send_mail(subject, receive_email, compose_email_html):
        sender_email = os.getenv("SENDER_EMAIL")
        sender_name = os.getenv("SENDER_NAME")
        smtp_server = os.getenv("SMTP_SERVER")
        smtp_port = os.getenv("SMTP_PORT")
        password = os.getenv("MAIL_PASSWORD")

        list_email_cc = []
        msg = MIMEMultipart("mixed")
        msg["Subject"] = subject
        msg["From"] = email.utils.formataddr((sender_name, sender_email))
        if receive_email.upper() == "Undetermined".upper():
            msg["To"] = sender_email
        else:
            msg["To"] = receive_email
            msg["Cc"] = ", ".join(list_email_cc)
        msg.attach(MIMEText(compose_email_html, "html"))

        context = ssl.create_default_context()
        with smtplib.SMTP(smtp_server, int(smtp_port)) as smtp:
            smtp.starttls(context=context)
            smtp.login(sender_email, password)
            smtp.send_message(msg)
            smtp.quit()

    @staticmethod
    def send_email(receive_email, subject,  template_params, template_file_name):
        # subject, template_mail = SendEmailController.build_template(template_params)
        # subject = "send email test"
        # template_mail = {"text": "aloha"}
        template_mail = template_params
        compose_email_html = SendEmailController.render_mail_template(
            template_mail, template_file_name
        )
        if subject and template_mail:
            SendEmailController.config_send_mail(
                subject, receive_email, compose_email_html
            )

    @staticmethod
    def build_template(template_params):
        data = json.dumps(template_params)
        data = json.loads(data)
        id = data.get("id")
        time = data.get("time")
        # email_to = data.get("email_to")
        source_ip = data.get("source_ip", "")
        destination = data.get("destination")
        flow_count = data.get("flow_count", -1)
        tenant = data.get("tenant")
        vpc = data.get("vpc")
        body_data = ""
        subject = "[Violation]"
        if id == 1:
            category = "Policy violation"
            subject = subject + " " + category
            body_data = {
                "category": category,
                "time": time,
                "source_ip": source_ip,
                "destination": destination,
                "tenant": tenant,
                "vpc": vpc,
            }
        elif id == 2:
            category = "DDoS Attack"
            subject = subject + " " + category
            body_data = {
                "category": category,
                "time": time,
                "destination": destination,
                "flow_count": flow_count,
                "tenant": tenant,
                "vpc": vpc,
            }
        elif id == 3:
            category = "Possible Attack"
            subject = subject + " " + category
            body_data = {
                "category": category,
                "time": time,
                "destination": destination,
                "tenant": tenant,
                "vpc": vpc,
            }

        return subject, body_data

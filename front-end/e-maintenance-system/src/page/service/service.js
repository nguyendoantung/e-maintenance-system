import React from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Typography, Divider, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import believeMe from '../../image/believe_me.jpeg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2%',
  },
  paper: {
    flexWrap: 'wrap',
  },
  serviceDetail: {
    margin: '2%',
  },
}));

const repairTypes = [
  {
    text: 'Tủ lạnh',
    price: '100.000 VND',
  },
  { text: 'Máy giặt', price: '150.000 VND' },
  { text: 'Điều hòa', price: '300.000 VND' },
  { text: 'Điện dân dụng', price: '50.000 VND' },
  { text: 'Điện nước', price: '100.000 VND' },
];

const feats = ['Dịch vụ', 'Báo giá', 'Hỏi đáp'];

const Service = () => {
  const classes = useStyles();
  const [featChoose, setFeatChoose] = React.useState('Dịch vụ');
  return (
    <>
      <div className={classes.root}></div>
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item md={4}>
                <Typography
                  variant="h4"
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Times New Roman',
                  }}
                >
                  Thông tin chi tiết
                </Typography>
                {feats.map((feat, index) => {
                  return (
                    <Typography
                      key={1}
                      style={{
                        textAlign: 'center',
                        fontFamily: 'Arial, Helvetica, sans-serif',
                        margin: '4%',
                      }}
                      variant="h5"
                      color={featChoose === feat ? 'primary' : 'textSecondary'}
                      // color="#CAC77"
                      onClick={() => setFeatChoose(feat)}
                    >
                      {feat}
                    </Typography>
                  );
                })}
              </Grid>
              <Grid item md={8}>
                <RenderFeat feat={featChoose} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const RenderFeat = (props) => {
  const { feat } = props;
  if (feat === 'Dịch vụ') {
    return (
      <>
        <Typography
          variant="h4"
          style={{
            textAlign: 'center',
          }}
        >
          Thông tin chi tiết dịch vụ
        </Typography>
      </>
    );
  } else if (feat === 'Báo giá') {
    return (
      <>
        <Typography
          style={{
            textAlign: 'center',
          }}
          variant="h4"
        >
          Giá dịch vụ - Cơ bản
        </Typography>
        <Typography
          style={
            {
              // textAlign: 'center',
            }
          }
          variant="h7"
        >
          Lưu ý, đây chỉ là mức giá tham khảo, chi phí cuối cùng sẽ
          <br />
          phụ thuộc vào mức độ thiệt hại và số lượng thiết bị được sử dụng.
          <br />
          Chi tiết vui lòng xem tại <a href="/bao-gia">đây</a>
        </Typography>
        {repairTypes.map((type, index) => {
          return (
            <>
              <Typography
                style={
                  {
                    // textAlign: 'center',
                  }
                }
                variant="h6"
              >
                {type.text}
                <a>: {type.price}</a>
              </Typography>
            </>
          );
        })}
      </>
    );
  } else if (feat === 'Hỏi đáp') {
    return (
      <Typography
        style={{
          textAlign: 'center',
        }}
        variant="h4"
      >
        Các vấn đề thường gặp
      </Typography>
    );
  } else return <div>Not support!</div>;
};

export default Service;

import React from 'react';
import {
  Typography,
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from '@material-ui/core';
import GetHistoryOneOrder from '../../../../../../request/getHistoryOneOrder';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  dialogTitle: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: 0,
    color: '#FFFFFF',
  },
}));

const DialogHistory = (props) => {
  const classes = useStyles();
  const [openHistory, setOpenHistory] = React.useState(false);
  const { order } = props;
  const orderId = order?.id;
  const orderName = order?.full_name;

  const { data } = GetHistoryOneOrder({ orderId, enabled: openHistory });
  // console.log(data);
  const { data: histories = [], total } = data?.data || {};
  return (
    <>
      <Typography onClick={() => setOpenHistory(true)}>
        {order?.full_name}
      </Typography>
      {openHistory && (
        <>
          <Dialog
            onClose={() => setOpenHistory(false)}
            open
            maxWidth="md"
            fullWidth
          >
            <DialogTitle className={classes.dialogTitle}>
              Lịch sử của đơn <strong>{orderName}</strong>
            </DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Thực hiện</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {histories.map(({ update_time: time, action }) => {
                    return (
                      <>
                        <TableRow>
                          <TableCell>{time}</TableCell>
                          <TableCell>{action}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default DialogHistory;

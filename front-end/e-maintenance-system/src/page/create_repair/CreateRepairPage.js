import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateRepairOrderForm from '../admin/manager/userService/createRepairOrder/CreateRepairOrderForm';
import { Box, Grid } from '@material-ui/core';
import { useMutation } from 'react-query';
import { showSuccess, showError } from '../../utils/notification';
import rootApi from '../../api/rootApi';
import path from '../../api/path';

const CreateRepairOrderPageUser = () => {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [open, setOpen] = React.useState(true);

  const goToHomePage = () => {
    //return to home page
    history.push('/');
  };

  const { mutateAsync, isLoading } = useMutation(
    ['create-repair-order', token],
    (formValues) => {
      const { name, phone, category, location, note, device } = formValues;
      const body = {
        full_name: name,
        phone,
        category: category,
        location,
        note,
        device_suggest: device,
      };
      return rootApi.post(path.admin.userService.createRepairOrder(), body);
    }
  );

  const handleSubmit = (formValues) => {
    mutateAsync(formValues)
      .then((res) => {
        showSuccess({
          message: res?.data?.data?.message || 'Tạo đơn thành công!',
        });
        // setOpen(false);
        goToHomePage();
      })
      .catch((err) => {
        showError({
          message: err.response?.data?.message || 'Thất bại!',
        });
      });
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ padding: '2%' }}
      >
        <Grid item xs={5}>
          <CreateRepairOrderForm
            token={token}
            onSubmit={handleSubmit}
            busy={isLoading}
            onCancelCreatePage={goToHomePage}
            // open={open}
            setOpen={setOpen}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default CreateRepairOrderPageUser;

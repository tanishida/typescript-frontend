import React, {useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../duck/types';
import {showDetailDialogAction} from '../../duck/app/actions';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

interface DetailDialogProps {
    name: string;
    detail: string;
}

export  const DetailDialog: React.FC<DetailDialogProps> = ({
  name, detail
}) => {
  const selectAppReducer = (state: RootState) => state.app;
  const appReducer = useSelector(selectAppReducer);
  const dispatch = useDispatch();
  const [detailText, setDetailText] = React.useState(true);
  const [closeButton, setCloseButton] = React.useState(false);

  const handleClose = () => {
    dispatch(showDetailDialogAction(false));
    setDetailText(true);
  };

  return (
    <div>
      <Dialog
        open={appReducer.isDetailDialogDisabled}
        onClose={handleClose}
        scroll={'paper'}
        fullWidth
        disableBackdropClick
        maxWidth={'sm'}
      >
        <DialogTitle>{`${name}の詳細`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={11}>
              <TextField
                label="詳細"
                multiline
                fullWidth
                rows={8}
                disabled={detailText}
                value={detail}
              />
            </Grid>
            <Grid item xs={1} />
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={closeButton} onClick={handleClose} color="primary" autoFocus>
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class AlertDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.state.open = this.props.blankChecker;
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ open: false });
  }

  componentWillReceiveProps(blankChecker) {
    this.setState({
      open: this.props.blankChecker
    });
  }
  render() {
    return (
      <div>
        <Dialog
          open={this.props.blankChecker}
          TransitionComponent={Transition}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"할일을 적어주세요"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              빈칸 입니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              네 적겠습니다
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
AlertDialog.propTypes = {
  blankChecker: PropTypes.bool
};
AlertDialog.defaultProps = {
  blankChecker: false
};

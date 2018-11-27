import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

export default class TodoEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      data: "",
      check: false,
      alert: "할일 적어주세요"
    };
    this.handleChange = this.handleChange.bind(this);
    this.todoSaveBtn = this.todoSaveBtn.bind(this);
    this.enterKeyPress = this.enterKeyPress.bind(this);
    this.todoOutBtn = this.todoOutBtn.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    //다이어로그 닫기
    this.setState({ openDialog: false });
  }
  handleChange(e) {
    //텍스트필드 내용 변경
    this.setState({
      data: e.target.value
    });
  }

  todoSaveBtn() {
    //버튼 저장하기
    const TodoData = {
      data: this.state.data
    };
    if (this.state.data === "" || this.state.data === null) {
      this.setState({
        openDialog: true
      });
    } else {
      this.props.todoSave(TodoData);
      this.setState({
        data: ""
      });
      this.todoOutBtn();
    }
  }

  todoOutBtn() {
    //에디트 창 닫기
    const outCheck = {
      check: this.state.check
    };

    this.props.todoOut(outCheck);
    console.log(this.state.check);
    this.setState({
      check: false
    });
  }

  enterKeyPress(e) {
    //엔터 저장
    if (e.charCode === 13) {
      this.todoSaveBtn();
    }
  }

  render() {
    const AlertDialog = () => {
      return (
        <Dialog
          open={this.state.openDialog}
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
      );
    };
    return (
      <Card className="TDChild">
        <CardHeader title="오늘 할일" />
        <TextField
          className="TDTextField"
          name="data"
          rows="2"
          variant="outlined"
          placeholder={this.state.alert}
          value={this.state.data}
          onChange={this.handleChange}
          onKeyPress={this.enterKeyPress}
        />
        <div id="editButtonArea">
          <p>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={this.todoSaveBtn}
            >
              생성
            </Button>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={this.todoOutBtn}
            >
              취소
            </Button>
            {/* 모듈화  해야됨*/}
            <AlertDialog />
          </p>
        </div>
      </Card>
    );
  }
}
TodoEdit.propTypes = {
  blankChecker: PropTypes.bool,
  todoSave: PropTypes.func,
  todoOut: PropTypes.func
};
TodoEdit.defaultProps = {
  todoSave: () => {
    console.error("저장안됨");
  },
  todoOut: () => {
    console.error("안나가짐");
  },
  blankChecker: false
};

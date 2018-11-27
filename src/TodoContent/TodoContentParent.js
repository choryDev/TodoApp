import React, { Component } from "react";
import TodoEdit from "./TodoEdit";
import TodoContentChild from "./TodoContentChild";
import PropTypes from "prop-types";

import update from "react-addons-update";
import Button from "@material-ui/core/Button";

export default class TodoContentParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEdit: false,
      TodoData: []
    };
    this.onEditCheck = this.onEditCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.todoSaveP = this.todoSaveP.bind(this);
    this.todoDeleteP = this.todoDeleteP.bind(this);
    this.todoUpdateP = this.todoUpdateP.bind(this);
    this.onEditCheckChild = this.onEditCheckChild.bind(this);
  }

  handleChange(e) {
    //텍스트 필드 값 변화시키기 위해
    this.setState({
      keyword: e.target.value
    });
  }
  onEditCheck(e) {
    //에디트 창 열고 닫기 위함
    if (!this.state.newEdit) {
      this.setState({
        newEdit: !this.state.newEdit
      });
    } else {
      this.setState({
        newEdit: !this.state.newEdit
      });
    }
  }
  onEditCheckChild() {
    //차일드 컴포넌드 손델시에 에디트창 닫기 위함
    this.setState({
      newEdit: false
    });
  }

  todoSaveP(contact) {
    //배열에 값 추가
    this.setState({
      TodoData: update(this.state.TodoData, { $push: [contact] })
    });
  }

  todoDeleteP(childIndex) {
    //배열의 인덱스 값에 1개 지우기
    this.setState({
      TodoData: update(this.state.TodoData, {
        $splice: [[childIndex, 1]]
      }),
      childIndex: -1
    });
  }

  todoUpdateP(data, index) {
    //배열의 인덱스 값에 1개 업데이트
    this.setState({
      TodoData: update(this.state.TodoData, {
        [index]: {
          data: { $set: data }
        }
      })
    });
  }

  render() {
    /*다이어로그 써먹자*/

    const mapToComponents = data => {
      return data.map((contact, i) => {
        return (
          <TodoContentChild
            onUpdateOn={this.onEditCheckChild}
            onRemove={this.todoDeleteP}
            onUpdate={this.todoUpdateP}
            contact={contact}
            index={i}
            key={i}
          />
        );
      });
    };

    return (
      /* 새로 만드는 부분*/
      <div className="TDParent">
        <h1>나의 할일들</h1>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={this.onEditCheck}
        >
          추가
        </Button>
        <div>
          {this.state.newEdit ? (
            <TodoEdit todoSave={this.todoSaveP} todoOut={this.onEditCheck} />
          ) : (
            <div />
          )}
        </div>
        <div>{mapToComponents(this.state.TodoData)}</div>
      </div>
    );
  }
}
TodoContentParent.defaultProps = {
  contact: {},
  onEditCheck: () => {
    console.error("버튼채크 오류");
  }
};

TodoContentParent.propTypes = {
  contact: PropTypes.object,
  onEditCheck: PropTypes.func
};

import React from 'react';
import { Drawer } from 'antd';
import { connect } from 'dva';

@connect(({ breadcrumb }) => ({
  breadcrumb,
  list: breadcrumb.list,
}))
class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: '',
    };
  }

  componentWillReceiveProps = async nextProps => {
    const { list } = nextProps;
    let title1 = '';
    let on = false;
    list.forEach(json => {
      if (json.key === nextProps.identifying) {
        on = json.open;
        title1 = json.title;
      }
    });
    this.setState({
      open: on,
      title: title1,
    });
  };

  render() {
    const { dispatch, list, children, identifying, title, id } = this.props;
    return (
      <div>
        <div
          style={{
            cursor: 'pointer',
            color: '#1ab393',
          }}
          onClick={() => {
            list.push({
              id,
              key: identifying,
              open: true,
              name: title,
              fun: () => {
                list.forEach((obj, i) => {
                  if (obj.key === identifying) {
                    list.splice(i + 1, list.length);
                  }
                });
                dispatch({
                  type: 'breadcrumb/fetch',
                  payload: { list },
                });
              },
            });
            dispatch({
              type: 'breadcrumb/fetch',
              payload: { list },
            });
          }}
        >
          {children}
        </div>
        <Drawer
          style={{
            position: 'absolute',
            top: '112px',
            height: 'calc(100vh - 112px)',
            overflow: 'auto',
          }}
          title={this.props.title || this.state.title}
          placement="right"
          width="1000px"
          onClose={() => {
            list.forEach((json, i) => {
              if (json.key === this.props.identifying) {
                list.splice(i, list.length);
              }
            });
            dispatch({
              type: 'breadcrumb/fetch',
              payload: { list },
            });
          }}
          visible={this.state.open}
          destroyOnClose
        >
          {this.props.info && this.props.info}
        </Drawer>
      </div>
    );
  }
}

export default Info;

import React from 'react';
import { Icon } from 'antd';
import styles from './Detail.less';
import { getRequest } from '@/utils/api';

import { GetStore } from '../Service';

import ChargeProject from './ChargeProject';
import TimePeriodSet from './TimePeriodSet';

import UploadPicture from '@/components/BusinessComponent/Upload/UploadPicture';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      InfoData: {},
    };
  }

  componentWillMount = async () => {
    const data = await getRequest(`${GetStore}?id=${this.props.id}`);
    if (data.status === 200) {
      await this.setState({
        InfoData: data.data,
      });
    }
  };

  render() {
    const { InfoData } = this.state;
    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>门店名称：：{InfoData.storeName}</span>
          </div>
          <div className={styles.cardWrap}>
            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="credit-card" className={styles.iconDom} />
                所属区域
              </p>
              <p className={styles.cardContent}>{InfoData.regionName}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                门店类型
              </p>
              <p className={styles.cardContent}>{InfoData.storeTypeStr}</p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                门店分数
              </p>
              <p className={styles.cardContent}>
                {InfoData.average ? InfoData.average : '暂无评分'}
              </p>
            </div>

            <div className={styles.cardDom}>
              <p className={styles.cardTitle}>
                <Icon type="team" className={styles.iconDom} />
                评论人数
              </p>
              <p className={styles.cardContent}>{InfoData.commentNum}</p>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>信息详情</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>门店名称</span>
                  <p>{InfoData.storeName}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>省市</span>
                  <p>
                    {InfoData.province}-{InfoData.city}
                  </p>
                </div>
                <div className={styles.itemDom}>
                  <span>门店编号</span>
                  <p>{InfoData.storeNumber}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>具体位置</span>
                  <p>{InfoData.detailedAddress}</p>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>官宣：</span>
                  <p>{InfoData.storePublicity}</p>
                </div>
                <div className={styles.itemDom}>
                  <span>备注：</span>
                  <p>{InfoData.remarks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.midWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>门店图片</span>
          </div>

          <div className={styles.midCon}>
            <div className={styles.midRight}>
              <div>
                <div className={styles.itemDom}>
                  <span>门店标题图</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.picture} disabled />
                  </div>
                </div>
              </div>

              <div>
                <div className={styles.itemDom}>
                  <span>门店展示图：</span>
                  <div>
                    <UploadPicture fileUrl={InfoData.publicityPicture} disabled />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>门店费项</span>
          </div>
          <ChargeProject id={this.props.id} />
        </div>

        <div className={styles.bottomWrap}>
          <div className={styles.titleDom}>
            <span />
            <span>排班时段设置</span>
          </div>
          <TimePeriodSet storeId={this.props.id} />
        </div>
      </div>
    );
  }
}

export default Details;

import Description from './components/Common/Description/Description';
import StartupTitle from './components/Common/StartupTitle/StartupTitle';
import { formatAmount } from './utils/formatAmount';

export const PAGE_SIZE = 10;

export const INVESTMENT_SORT_OPTIONS = {
  '모의 누적 투자 금액 높은 순': ['sim_invest', 'desc'],
  '모의 누적 투자 금액 낮은 순': ['sim_invest', 'asc'],
  '실제 누적 투자 금액 높은 순': ['actual_invest', 'desc'],
  '실제 누적 투자 금액 낮은 순': ['actual_invest', 'asc']
};

export const INVESTMENT_TABLE_DATA = [
  {
    title: '순위',
    width: '6.8rem',
    render: (item) => item.rank + '위'
  },
  {
    title: '기업 명',
    width: '21.3rem',
    render: (item) => <StartupTitle item={item} />
  },
  {
    title: '기업 소개',
    width: '30.4rem',
    render: (item) => <Description item={item} />
  },
  {
    title: '카테고리',
    width: '15.4rem',
    render: (item) => item.startup.categoryName
  },
  {
    title: '모의 누적 투자 금액',
    width: '23.1rem',
    render: (item) => formatAmount(item.startup.simInvest)
  },
  {
    title: '실제 누적 투자 금액',
    width: '23rem',
    render: (item) => formatAmount(item.startup.actualInvest)
  }
];

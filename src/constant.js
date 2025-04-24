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

export const STARTUP_SORT_OPTIONS = {
  '누적 투자 금액 높은 순': ['total_investment', 'desc'],
  '누적 투자 금액 낮은 순': ['total_investment', 'asc'],
  '매출액 높은 순': ['revenue', 'desc'],
  '매출액 낮은 순': ['revenue', 'asc'],
  '고용인원 높은 순': ['employee_count', 'desc'],
  '고용인원 낮은 순': ['employee_count', 'asc']
};

export const COMPARISON_SORT_OPTIONS = {
  '나의 기업 선택 횟수 높은 순': ['selected_count', 'desc'],
  '나의 기업 선택 횟수 낮은 순': ['selected_count', 'asc'],
  '비교 기업 선택 횟수 높은 순': ['compared_count', 'desc'],
  '비교 기업 선택 횟수 낮은 순': ['compared_count', 'asc']
};

export const RANK_SORT_OPTIONS = {
  '매출액 높은 순': ['revenue', 'desc'],
  '매출액 낮은 순': ['revenue', 'asc'],
  '고용인원 높은 순': ['employee_count', 'desc'],
  '고용인원 낮은 순': ['employee_count', 'asc']
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
    render: (item) => <StartupTitle item={item.startup} />
  },
  {
    title: '기업 소개',
    width: '30.4rem',
    render: (item) => <Description item={item.startup} />
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

export const STARTUP_TABLE_DATA = [
  {
    title: '순위',
    width: '6.8rem',
    render: (item) => item.rank + '위'
  },
  {
    title: '기업 명',
    render: (item) => <StartupTitle item={item} />
  },
  {
    title: '기업 소개',
    width: '30rem',
    render: (item) => <Description item={item} />
  },
  {
    title: '카테고리',
    render: (item) => item.categoryName
  },
  {
    title: '누적 투자 금액',
    render: (item) => formatAmount(item.simInvest)
  },
  {
    title: '매출액',
    render: (item) => formatAmount(item.revenue)
  },
  {
    title: '고용 인원',
    render: (item) => formatAmount(item.employees)
  }
];

export const COMPARISON_TABLE_DATA = [
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
    width: '30.5rem',
    render: (item) => <Description item={item} />
  },
  {
    title: '카테고리',
    width: '15.4rem',
    render: (item) => item.categoryName
  },
  {
    title: '나의 기업 선택 횟수',
    width: '23rem',
    render: (item) => formatAmount(item.selectedCount)
  },
  {
    title: '비교 기업 선택 횟수',
    width: '23rem',
    render: (item) => formatAmount(item.comparedCount)
  }
];

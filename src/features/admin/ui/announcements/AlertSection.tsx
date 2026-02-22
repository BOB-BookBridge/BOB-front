import { simpleFormatDate } from '@/shared/lib';
import AdminTable, { ColumnConfig } from '../AdminTable';
import { SectionContainer, SectionTitle } from './BannerSection.styles';
import { User } from '@/entities/admin/reports';
const data = [
  {
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지3',
    createdAt: '2026-02-20T00:33:06',
  },
  {
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지2',
    createdAt: '2026-02-20T00:33:03',
  },
  {
    writer: {
      id: '019bf8a2-ef66-7bf5-b97b-0b0047fa36fd',
      nickname: 'manager001',
    },
    title: '[공지]',
    content: '테스트 공지1',
    createdAt: '2026-02-20T00:32:53',
  },
];

const AlertSection = () => {
  const columns: ColumnConfig[] = [
    { key: 'number', label: '번호', width: 6 },
    { key: 'title', label: '제목', width: 24 },
    { key: 'content', label: '내용', width: 40 },
    {
      key: 'writer',
      label: '작성자',
      width: 20,
      render: (writer) => (writer as User).nickname as string,
    },
    {
      key: 'createdAt',
      label: '작성일',
      width: 10,
      render: (date) => simpleFormatDate(date as string),
    },
  ];
  return (
    <SectionContainer>
      <SectionTitle>🔔 알림 공지 목록</SectionTitle>
      <AdminTable
        columns={columns}
        data={data.map((inq, index) => ({
          ...inq,
          number: index + 1,
        }))}
        keyExtractor={(inq) => inq.number}
      />
    </SectionContainer>
  );
};

export default AlertSection;

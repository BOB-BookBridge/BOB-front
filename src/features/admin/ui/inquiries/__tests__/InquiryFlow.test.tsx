import React from 'react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/shared/test/renderWithProviders';
import * as queriesModule from '@/entities/admin/inquirues/queries';
import { GetInquiryRes } from '@/entities/admin/inquirues';
import InquiryDetail from '../InquiryDetail';
import InquiryList from '../InquiryList';
import { useMyQuery } from '@/entities/user';

const mockInquiryDetailData: GetInquiryRes = {
  id: 1,
  status: 'PENDING' as const,
  title: 'Q1',
  email: 'user1@example.com',
  content: '이것은 첫 번째 문의입니다',
  reply: null,
  managerNickname: null,
  createdAt: '2026-01-20T07:34:41',
  processedAt: null,
};

const mockMyData = {
  nickname: 'manager',
  email: 'manager@example.com',
};

const mockUseMyQuery = (data = mockMyData) => {
  (jest.mocked(useMyQuery) as jest.Mock).mockReturnValue({
    data,
  });
};

jest.mock('@/shared/ui', () => ({
  Button: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick}>{text}</button>
  ),
  LoadingIndicator: () => <div aria-label='로딩'>로딩 중...</div>,
  LoadingContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));
jest.mock('@/shared/assets/icons');
jest.mock('@/entities/admin/inquirues/queries');
jest.mock('next/navigation');
jest.mock('@/entities/user');

describe('문의 플로우 통합 테스트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseMyQuery();
    (
      jest.mocked(queriesModule.useInquiriesQuery) as jest.Mock
    ).mockImplementation(({ status }) => {
      const allData = [
        {
          id: 1,
          status: 'PENDING' as const,
          title: 'Q1',
          email: 'user1@example.com',
          managerNickname: null,
          createdAt: '2026-01-20T07:34:41',
          processedAt: null,
        },
        {
          id: 2,
          status: 'IN_REVIEW' as const,
          title: 'Q2',
          email: 'user2@example.com',
          managerNickname: 'manager001',
          createdAt: '2026-01-19T10:20:00',
          processedAt: null,
        },
      ];

      const data = status
        ? allData.filter((item) => item.status === status)
        : allData;

      return {
        isPending: false,
        data: { totalCount: 2, inquiries: data },
      };
    });

    (jest.mocked(queriesModule.useInquiryQuery) as jest.Mock).mockReturnValue({
      isPending: false,
      data: mockInquiryDetailData,
    });

    (jest.mocked(useRouter) as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });

    (
      jest.mocked(queriesModule.useAdminInquiryMutation) as jest.Mock
    ).mockReturnValue({
      mutate: jest.fn(),
    });
  });

  it('문의 목록을 확인할 수 있습니다', () => {
    renderWithProviders(
      <InquiryList searchKey='email' keyword='' status='ALL' />,
    );

    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('Q2')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
    expect(screen.getByText('user2@example.com')).toBeInTheDocument();
  });

  it('문의 목록에서 상태별로 필터링할 수 있습니다', () => {
    renderWithProviders(
      <InquiryList searchKey='email' keyword='' status='PENDING' />,
    );

    expect(jest.mocked(queriesModule.useInquiriesQuery)).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'PENDING',
      }),
    );
    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.queryByText('Q2')).not.toBeInTheDocument();
  });

  it('목록에서 문의를 클릭하면 디테일 페이지로 이동합니다', async () => {
    const mockPush = jest.fn();
    (jest.mocked(useRouter) as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const user = userEvent.setup();
    renderWithProviders(
      <InquiryList searchKey='email' keyword='' status='ALL' />,
    );

    const firstRow = screen.getByText('Q1');
    await user.click(firstRow);

    expect(mockPush).toHaveBeenCalledWith('/admin/supports/inquiries/1');
  });

  it('디테일 페이지에서 문의 내용을 확인할 수 있습니다', () => {
    renderWithProviders(<InquiryDetail id={1} />);

    expect(screen.getByText('Q1')).toBeInTheDocument();
    expect(screen.getByText('이것은 첫 번째 문의입니다')).toBeInTheDocument();
    expect(screen.getByText('user1@example.com')).toBeInTheDocument();
  });

  it('문의 상태를 변경할 수 있습니다', async () => {
    const mockMutate = jest.fn();
    (
      jest.mocked(queriesModule.useAdminInquiryMutation) as jest.Mock
    ).mockReturnValue({
      mutate: mockMutate,
    });

    const user = userEvent.setup();
    renderWithProviders(<InquiryDetail id={1} />);

    const statusButton = screen.getByText('답변 대기');
    await user.click(statusButton);

    const inReviewOption = screen.getByText('검토 중');
    await user.click(inReviewOption);

    expect(mockMutate).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'IN_REVIEW' }),
      expect.any(Object),
    );
  });
});

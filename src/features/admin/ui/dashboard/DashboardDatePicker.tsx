import 'dayjs/locale/ko';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';
import { useState, useRef } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { DateRange } from '@/entities/admin/dashboard';

interface DashboardDateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const formatDate = (date: Dayjs | null) => {
  return date ? date.format('YYYY.MM.DD') : undefined;
};

const DashboardDatePicker = ({
  value,
  onChange,
}: DashboardDateRangePickerProps) => {
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);

  const handleTriggerClick = () => {
    setFromOpen(true);
  };

  const handleFromChange = (date: Dayjs | null) => {
    onChange({ from: date, to: value.to });
    setFromOpen(false);
    setToOpen(true);
  };

  const handleToChange = (date: Dayjs | null) => {
    onChange({ from: value.from, to: date });
    setToOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
      <Trigger ref={anchorRef} onClick={handleTriggerClick}>
        <DateText>
          {formatDate(value.from)}~{formatDate(value.to)}
        </DateText>
        <CalendarIcon />
      </Trigger>

      <DatePicker
        value={value.from}
        onChange={handleFromChange}
        open={fromOpen}
        onClose={() => setFromOpen(false)}
        slots={{ field: () => null }}
        slotProps={{
          popper: { anchorEl: anchorRef.current },
        }}
        maxDate={value.to ?? undefined}
      />

      <DatePicker
        value={value.to}
        onChange={handleToChange}
        open={toOpen}
        onClose={() => setToOpen(false)}
        slots={{ field: () => null }}
        slotProps={{
          popper: { anchorEl: anchorRef.current },
        }}
        minDate={value.from ?? undefined}
        maxDate={value.to ?? undefined}
      />
    </LocalizationProvider>
  );
};

export default DashboardDatePicker;

export const Trigger = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.SECONDARY_300};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  user-select: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.SECONDARY_400};
  }
`;

export const DateText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.SECONDARY};
  letter-spacing: 0.01em;
`;

export const CalendarIcon = styled(CalendarMonthOutlinedIcon)`
  font-size: 18px !important;
  color: ${({ theme }) => theme.colors.SECONDARY_400};
`;

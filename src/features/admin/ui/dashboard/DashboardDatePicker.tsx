import 'dayjs/locale/ko';
import dayjs, { Dayjs } from 'dayjs';
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
  const [localRange, setLocalRange] = useState<DateRange>(value);

  function handleTriggerClick() {
    setFromOpen(true);
  }

  function handleFromChange(date: Dayjs | null) {
    setLocalRange({ from: date, to: localRange.to });
    setFromOpen(false);
    setToOpen(true);
  }

  function handleToChange(date: Dayjs | null) {
    const newRange = { from: localRange.from, to: date };
    setLocalRange(newRange);
    setToOpen(false);
    if (
      newRange.from?.isSame(value.from, 'day') &&
      newRange.to?.isSame(value.to, 'day')
    )
      return;

    onChange(newRange);
  }

  function handleFromClose() {
    setFromOpen(false);

    if (localRange.from) {
      setToOpen(true);
    }
  }

  function handleToClose() {
    setToOpen(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
      <Trigger ref={anchorRef} onClick={handleTriggerClick}>
        <DateText>
          {formatDate(localRange.from)}~{formatDate(localRange.to)}
        </DateText>
        <CalendarIcon />
      </Trigger>

      <DatePicker
        value={localRange.from}
        onAccept={handleFromChange}
        open={fromOpen}
        onClose={handleFromClose}
        slots={{ field: () => null }}
        slotProps={{
          popper: { anchorEl: anchorRef.current },
        }}
        minDate={dayjs('2025-05-01')}
        maxDate={dayjs()}
      />

      <DatePicker
        value={localRange.to}
        onAccept={handleToChange}
        open={toOpen}
        onClose={handleToClose}
        slots={{ field: () => null }}
        slotProps={{
          popper: { anchorEl: anchorRef.current },
        }}
        minDate={localRange.from ?? undefined}
        maxDate={dayjs()}
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

import styled from 'styled-components';
import { colors } from '../../../shared/constants';
import { TradeStatus } from '@/entities/listing/model/types';

interface OverlayProps {
  status: TradeStatus;
}

export const CardContainer = styled.div`
  width: 25%;
  padding: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    width: 33%;
  }

  @media (max-width: 744px) {
    width: 50%;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 10px;
  border: 0.5px solid ${({ theme }) => theme.colors.GRAY_300};
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  border-radius: 10px;
`;

export const OverlayDim = styled.div<OverlayProps>`
  position: absolute;
  background-color: ${({ status }) =>
    status === 'READY' ? 'transparent' : 'rgba(0, 0, 0, 0.7)'};
  z-index: 11;
  width: 100%;
  height: 100%;
`;

export const TagWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

export const OverlayStatusText = styled.div`
  position: absolute;
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: ${colors.light.WHITE};
  z-index: 13;
`;

export const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.03);
  transform-origin: center;
  transition: transform 0.3s ease;
`;

export const TitleText = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 300;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const PriceText = styled.span`
  font-size: 16px;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const InfoText = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: ${colors.light.GRAY_600};
  margin: 0;
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

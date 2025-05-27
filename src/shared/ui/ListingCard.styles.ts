import styled from 'styled-components';
import { colors } from '../constants';

interface OverlayProps {
  status: 'READY' | 'IN_PROGRESS' | 'COMPLETED';
}

export const CardContainer = styled.div`
  width: 25%;
  padding: 10px;
  cursor: pointer;
  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    width: 35%;
  }

  @media (max-width: 744px) {
    width: 45%;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

export const Overlay = styled.div<OverlayProps>`
  background-color: ${({ status }) =>
    status === 'READY' ? 'transparent' : 'rgba(0, 0, 0, 0.7)'};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  border-radius: 10px;
  border: 0.5px solid ${colors.light.GRAY_600};
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

export const TagWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
`;

export const OverlayStatusText = styled.div`
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const TitleText = styled.p`
  margin-top: 10px;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
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
  font-weight: 700;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

import { colors } from '@/shared/constants';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  @media (max-width: 479px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 0.8;
  padding: 5px 20px;
  margin: 0;
  min-width: 0;
`;

export const RightSection = styled.div`
  flex: 1;
  padding: 5px 20px;
  margin: 0;
`;

export const HeadingText = styled.p`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const Text = styled.span`
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Description = styled.p`
  font-size: 13px;
`;

export const SubText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.GRAY_600};
`;

export const ImageCarousel = styled.div`
  background-color: pink;
  width: 100%;
  padding-bottom: 100%;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`;

export const UserText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const MetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
`;

export const SectionTitle = styled.div`
  margin-top: 20px;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  row-gap: 10px;
  column-gap: 12px;
  margin: 10px 0;
`;

export const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  gap: 10px;
`;

type ButtonVariant = 'primary' | 'outline-primary' | 'outline-gray';

interface StyledButtonProps {
  variant: ButtonVariant;
}

export const Button = styled.div<StyledButtonProps>`
  flex: 1;
  padding: 12px 16px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 16px;
  border: 1.5px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.PRIMARY};
          color: ${colors.light.WHITE};
          border-color: ${theme.colors.PRIMARY};
        `;
      case 'outline-primary':
        return `
          background-color: transparent;
          color: ${theme.colors.PRIMARY};
          border-color: ${theme.colors.PRIMARY};
        `;
      case 'outline-gray':
        return `
          background-color: transparent;
          color: ${theme.colors.GRAY_500};
          border-color: ${theme.colors.GRAY_500};
        `;
    }
  }}
`;

export const EditList = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 10px;
  right: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border-radius: 10px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

interface EditItemProps {
  type: string;
}

export const EditItem = styled.div<EditItemProps>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px;
  cursor: pointer;
  border-radius: 5px;
  margin: 5px;
  padding-right: 20px;
  font-size: 14px;
  color: ${({ type, theme }) =>
    type === 'DELETE' ? theme.colors.ERROR : theme.colors.BLACK};

  &:hover {
    background-color: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export const SwiperWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 100%;

  .swiper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }

  .swiper-slide {
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .swiper-button-prev,
  .swiper-button-next {
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${colors.light.WHITE};
    font-size: 12px;

    transition: background-color 0.2s;

    &::after {
      font-size: 10px;
      color: ${colors.light.WHITE};
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .swiper-button-prev {
    left: 8px;
  }

  .swiper-button-next {
    right: 8px;
  }
`;

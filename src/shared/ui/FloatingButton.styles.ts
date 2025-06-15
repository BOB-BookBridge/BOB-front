import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${({ theme }) => theme.zIndex.fabOverlay};
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Container = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  padding: 10px;
  z-index: ${({ theme }) => theme.zIndex.fab};
  flex-direction: column;
  align-items: flex-end;
`;

interface IconWrapperProps {
  mode: 'dark' | 'light';
  $isOpen: boolean;
}
export const IconWrapper = styled.div<IconWrapperProps>`
  position: relative;
  background-color: ${({ $isOpen, theme }) =>
    $isOpen ? theme.colors.WHITE : theme.colors.PRIMARY};
  width: 60px;
  height: 60px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 50px;
    height: 50px;
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  right: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: 160px;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const MenuItem = styled.div`
  display: flex;
  width: 100%;
  gap: 10px;
  align-items: center;
  cursor: pointer;
  padding: 10px 10px;
  border-radius: 10px;
  &:hover {
    background: ${({ theme }) => theme.colors.GRAY_300};
  }
`;

export const SmallIconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.PRIMARY};
  width: 25px;
  height: 25px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

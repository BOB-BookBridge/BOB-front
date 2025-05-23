'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { StyledButton } from './SignUpForm.styles';

const TermsModal = ({
  header,
  sections,
}: {
  header: string;
  sections: { title: string; contents: string[] }[];
}) => {
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Overlay onClick={() => router.back()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <h3>{header}</h3>
        {sections.map((section) => (
          <div key={section.title}>
            <Title>{section.title}</Title>
            {section.contents.map((content, idx) => (
              <div key={content + idx}>
                <Content>
                  {idx + 1}. {content}
                </Content>
              </div>
            ))}
          </div>
        ))}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
            marginTop: 20,
          }}>
          <StyledButton type='TRANSPARENT' onClick={() => router.back()}>
            닫기
          </StyledButton>
        </div>
      </ModalBox>
    </Overlay>
  );
};

export default TermsModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 30%;
  left: 50%;
  max-width: 400px;
  max-height: 500px;
  overflow-y: scroll;
  transform: translate(-50%, -30%);
  background-color: ${({ theme }) => theme.colors.WHITE};
  padding: 20px;
  border-radius: 20px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.GRAY_700}`};
    border-radius: 5px;
    border-right: 1px solid transparent;
    background-clip: padding-box;
    box-sizing: border-box;
  }

  &::-webkit-scrollbar-button:vertical:start:increment,
  &::-webkit-scrollbar-button:vertical:end:decrement {
    display: block;
    height: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => `${theme.colors.GRAY_500}`};
  }
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 5px;
`;

const Content = styled.p`
  font-size: 11px;
  font-weight: 300;
  margin: 0;
`;

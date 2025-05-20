import { colors } from '../constants';

type InputGroupProps = {
  inputs: {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    rightElement?: React.ReactNode;
  }[];
};

const InputGroup = ({ inputs }: InputGroupProps) => {
  return (
    <div
      style={{
        border: `1px solid ${colors.dark.GRAY_500}`,
        borderRadius: 12,
        width: '100%',
        maxWidth: '300px',
        overflow: 'hidden',
      }}>
      {inputs.map((input, idx) => (
        <div
          key={input.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: '50px',
            borderTop: idx === 0 ? 'none' : `1px solid ${colors.dark.GRAY_500}`,
            padding: '10px',
          }}>
          <input
            type='email'
            name={input.name}
            placeholder={input.placeholder}
            value={input.value}
            onChange={input.onChange}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 12,
              backgroundColor: 'transparent',
            }}
          />
          {input.rightElement}
        </div>
      ))}
    </div>
  );
};

export default InputGroup;

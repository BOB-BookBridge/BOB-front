import { postCodeVerify, postEmailVerify } from '@/entities/auth';

export async function handleCodeRequest({
  email,
  onSuccess,
  onError: _,
}: {
  email: string;
  onSuccess: () => void;
  onError?: () => void;
}) {
  try {
    await postEmailVerify({ email });
    onSuccess();
  } catch (error) {
    console.log(error);
    // onError();
  }
}

export async function handleEmailConfirm({
  email,
  code,
  onSuccess,
  onError: _,
}: {
  email: string;
  code: string;
  onSuccess: () => void;
  onError?: () => void;
}) {
  try {
    await postCodeVerify({ email, code });
    onSuccess();
  } catch (error) {
    console.log(error);
    // onError();
  }
}

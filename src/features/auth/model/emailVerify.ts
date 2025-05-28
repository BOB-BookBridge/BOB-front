export function handleCodeRequest({
  email,
  onSuccess,
  onError: _,
}: {
  email: string;
  onSuccess: () => void;
  onError?: () => void;
}) {
  console.log(email);
  onSuccess();
}
export function handleEmailConfirm({
  email,
  verifyCode,
  onSuccess,
  onError,
}: {
  email: string;
  verifyCode: string;
  onSuccess: () => void;
  onError?: () => void;
}) {
  console.log(email, verifyCode);
  onSuccess();
}

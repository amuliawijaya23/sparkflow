'use server';

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

export const verifyCaptcha = async (token: string | null) => {
  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: 'POST' },
  );
  if (res.ok) {
    return 'success!';
  } else {
    throw new Error(`Failed Captcha!`);
  }
};

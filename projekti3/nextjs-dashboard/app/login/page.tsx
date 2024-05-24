import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />

        <div className="flex-1 rounded-lg bg-blue-500 px-6 pb-4 pt-8">
          <div className="w-32 text-white md:w-36">
            <h2>Demo user</h2>
            <p>Username: user@nextmail.com</p>
            <p>Password: 123456</p>
          </div>
        </div>
      </div>
    </main>
  );
}

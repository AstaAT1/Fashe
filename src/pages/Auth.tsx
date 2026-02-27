import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
import { useDocumentTitle } from '@/hooks';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useUIStore } from '@/store/uiStore';

type Tab = 'login' | 'register' | 'forgot';

export default function Auth() {
    useDocumentTitle('Account');
    const [tab, setTab] = useState<Tab>('login');

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {tab === 'login' ? 'Welcome Back' : tab === 'register' ? 'Create Account' : 'Reset Password'}
                    </h1>
                    <p className="text-[var(--text-secondary)]">
                        {tab === 'login'
                            ? 'Sign in to access your account'
                            : tab === 'register'
                                ? 'Join FASHE for the best shopping experience'
                                : "Enter your email and we'll send you a reset link"}
                    </p>
                </div>

                {/* Tabs */}
                {tab !== 'forgot' && (
                    <div className="flex mb-6 bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
                        {(['login', 'register'] as const).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${tab === t
                                        ? 'bg-[var(--bg-card)] shadow-sm text-[var(--text-primary)]'
                                        : 'text-[var(--text-muted)]'
                                    }`}
                            >
                                {t === 'login' ? 'Sign In' : 'Sign Up'}
                            </button>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {tab === 'login' && <LoginForm key="login" onForgot={() => setTab('forgot')} />}
                    {tab === 'register' && <RegisterForm key="register" />}
                    {tab === 'forgot' && <ForgotForm key="forgot" onBack={() => setTab('login')} />}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

function LoginForm({ onForgot }: { onForgot: () => void }) {
    const { addToast } = useUIStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        addToast({ message: 'Welcome back! (demo mode)', type: 'success' });
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Email"
                type="email"
                icon={<HiOutlineMail className="w-4 h-4" />}
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />
            <Input
                label="Password"
                type="password"
                icon={<HiOutlineLockClosed className="w-4 h-4" />}
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
            />
            <div className="flex justify-end">
                <button type="button" onClick={onForgot} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    Forgot password?
                </button>
            </div>
            <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                Sign In
            </Button>
        </motion.form>
    );
}

function RegisterForm() {
    const { addToast } = useUIStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { name: '', email: '', password: '', confirm: '' },
    });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        addToast({ message: 'Account created! (demo mode)', type: 'success' });
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Full Name"
                icon={<HiOutlineUser className="w-4 h-4" />}
                {...register('name', { required: 'Name is required' })}
                error={errors.name?.message}
            />
            <Input
                label="Email"
                type="email"
                icon={<HiOutlineMail className="w-4 h-4" />}
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />
            <Input
                label="Password"
                type="password"
                icon={<HiOutlineLockClosed className="w-4 h-4" />}
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                error={errors.password?.message}
            />
            <Input
                label="Confirm Password"
                type="password"
                icon={<HiOutlineLockClosed className="w-4 h-4" />}
                {...register('confirm', { required: 'Please confirm your password' })}
                error={errors.confirm?.message}
            />
            <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                Create Account
            </Button>
        </motion.form>
    );
}

function ForgotForm({ onBack }: { onBack: () => void }) {
    const { addToast } = useUIStore();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { email: '' },
    });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        addToast({ message: 'Reset link sent! (demo mode)', type: 'success' });
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input
                label="Email"
                type="email"
                icon={<HiOutlineMail className="w-4 h-4" />}
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
            />
            <Button type="submit" fullWidth size="lg" loading={isSubmitting}>
                Send Reset Link
            </Button>
            <button type="button" onClick={onBack} className="w-full text-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                Back to Sign In
            </button>
        </motion.form>
    );
}

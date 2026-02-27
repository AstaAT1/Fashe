import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';
import { useDocumentTitle } from '@/hooks';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function Contact() {
    useDocumentTitle('Contact');
    const { addToast } = useUIStore();
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { name: '', email: '', subject: '', message: '' },
    });

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1000));
        addToast({ message: 'Message sent! We\'ll get back to you soon.', type: 'success' });
        reset();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Breadcrumbs />

            <div className="max-w-4xl mx-auto py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl sm:text-4xl font-bold mb-3">Get in Touch</h1>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto">
                        Have a question or feedback? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-12">
                    {/* Info */}
                    <div className="md:col-span-2 space-y-8">
                        {[
                            { icon: HiOutlineMail, title: 'Email', info: 'hello@fashe.com' },
                            { icon: HiOutlinePhone, title: 'Phone', info: '+1 (555) 123-4567' },
                            { icon: HiOutlineLocationMarker, title: 'Address', info: '123 Fashion Ave\nNew York, NY 10001' },
                        ].map(({ icon: Icon, title, info }) => (
                            <div key={title} className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-950 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm mb-0.5">{title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] whitespace-pre-line">{info}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="md:col-span-3 space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Name"
                                {...register('name', { required: 'Required' })}
                                error={errors.name?.message}
                            />
                            <Input
                                label="Email"
                                type="email"
                                {...register('email', { required: 'Required' })}
                                error={errors.email?.message}
                            />
                        </div>
                        <Input
                            label="Subject"
                            {...register('subject', { required: 'Required' })}
                            error={errors.subject?.message}
                        />
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Message</label>
                            <textarea
                                rows={5}
                                className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] resize-none"
                                placeholder="Tell us how we can help..."
                                {...register('message', { required: 'Required' })}
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                        </div>
                        <Button type="submit" size="lg" loading={isSubmitting}>
                            Send Message
                        </Button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
}

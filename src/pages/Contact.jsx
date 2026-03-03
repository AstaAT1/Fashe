import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'

const schema = z.object({
    name: z.string().min(1, 'Required'),
    email: z.string().email('Invalid email'),
    subject: z.string().min(1, 'Required'),
    message: z.string().min(5, 'Too short'),
})

export default function Contact() {
    useEffect(() => { document.title = 'Contact — FASHE' }, [])
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async () => {
        await new Promise((r) => setTimeout(r, 1000))
        toast.success("Message sent! We'll get back to you soon.")
        reset()
    }

    return (
        <div className="container-main page-padding">
            <div className="max-w-5xl mx-auto py-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
                    <p className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-3">Contact Us</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 font-[family-name:var(--font-display)]">Get in Touch</h1>
                    <p className="text-[var(--text-secondary)] max-w-md mx-auto">Have a question or feedback? We'd love to hear from you.</p>
                </motion.div>

                <div className="grid md:grid-cols-5 gap-12 lg:gap-16">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="md:col-span-2 space-y-8">
                        {[
                            { icon: Mail, title: 'Email', info: 'hello@fashe.com' },
                            { icon: Phone, title: 'Phone', info: '+1 (555) 123-4567' },
                            { icon: MapPin, title: 'Address', info: '123 Fashion Ave\nNew York, NY 10001' },
                        ].map(({ icon: Icon, title, info }) => (
                            <div key={title} className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm mb-1">{title}</h3>
                                    <p className="text-sm text-[var(--text-secondary)] whitespace-pre-line">{info}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.form initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        onSubmit={handleSubmit(onSubmit)} className="md:col-span-3 space-y-5 bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 sm:p-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Name</label>
                                <input {...register('name')} className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                                {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Email</label>
                                <input type="email" {...register('email')} className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                                {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Subject</label>
                            <input {...register('subject')} className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40" />
                            {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message</label>
                            <textarea rows={6} {...register('message')} placeholder="Tell us how we can help..." className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none" />
                            {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                        </div>
                        <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-light disabled:opacity-50 transition-all">
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    )
}

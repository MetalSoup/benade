import { Head } from '@inertiajs/react';
import {
    BriefcaseIcon,
    CodeIcon,
    EnvelopeSimpleIcon,
    GlobeSimpleIcon,
    ImagesIcon,
    MapPinIcon,
    PaperPlaneTiltIcon,
    PhoneIcon,
    WrenchIcon,
} from '@phosphor-icons/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import LightGallery from 'lightgallery/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ContactForm from '@/components/ContactForm';
import LightRays from '@/components/LightRays';
import Galaxy from '@/components/ui/Galaxy';
import Navbar from '@/components/ui/navbar';
import { useAppearance } from '@/hooks/use-appearance';
import cashbag_1 from '../assets/cashbag_1.webp';
import cashbag_2 from '../assets/cashbag_2.png';
import cashbag_3 from '../assets/cashbag_3.png';
import cashbag_home from '../assets/cashbag_home.webp';
import coreg_1 from '../assets/coreg_1.png';
import coreg_2 from '../assets/coreg_2.png';
import coreg_3 from '../assets/coreg_3.png';
import coreg_4 from '../assets/coreg_4.png';
import coreg_5 from '../assets/coreg_5.png';
import coreg_6 from '../assets/coreg_6.png';
import coreg_7 from '../assets/coreg_7.png';
import coreg from '../assets/coregsoftware_home.webp';
import eugene from '../assets/eugene.webp';
import flow_1 from '../assets/flow_1.png';
import flow_2 from '../assets/flow_2.png';
import flow_3 from '../assets/flow_3.png';
import flow_4 from '../assets/flow_4.png';
import flow_5 from '../assets/flow_5.png';
import flow_6 from '../assets/flow_6.png';
import backgroundImage2 from '../assets/photo-1567095761054-7a02e69e5c43.avif';
import uapply_1 from '../assets/uapply_1.webp';





// import backgroundImage from '../assets/photo-1484589065579-248aad0d8b13.avif';
// import backgroundImage1 from '../assets/photo-1541701494587-cb58502866ab.avif';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-zoom.css';
import 'swiper/css';

type FeaturedProjectImage = {
    key: string;
    src: string;
    description?: string;
};

type FeaturedProject = {
    title: string;
    summary: string;
    stack: string;
    outcome: string;
    images: FeaturedProjectImage[];
};

const impactStats = [
    { label: 'Current role', value: 'Lead Developer' },
    { label: 'Primary stack', value: 'PHP + Laravel + React' },
    { label: 'Location', value: 'Pretoria, South Africa' },
];

const capabilities = [
    {
        title: 'Laravel Backend Development',
        detail: 'Builds and maintains scalable web applications with strong validation, API integrations, and reliable data flows.',
        stack: [
            'PHP',
            'Laravel',
            'MySQL',
            'API Integration',
            'Performance Tuning',
        ],
    },
    {
        title: 'React Frontend Development',
        detail: 'Creates responsive interfaces and interactive user experiences with React, TypeScript, and modern CSS workflows.',
        stack: [
            'React',
            'TypeScript',
            'Tailwind CSS',
            'JavaScript',
            'HTML/CSS',
        ],
    },
    {
        title: 'Team Delivery and Quality',
        detail: 'Leads collaboration, code reviews, and delivery practices that improve maintainability and reduce production risk.',
        stack: [
            'Team Leadership',
            'Code Review',
            'Debugging',
            'Testing',
            'Mentoring',
        ],
    },
];

const featuredProjects: FeaturedProject[] = [
    {
        title: 'FlowWeaver (WIP)',
        summary:
            'A more advanced Co-registration platform for creating intricate web forms with advanced conditional logic.',
        stack: 'PHP, Laravel, React, TypeScript, Inertia, API/Webhooks',
        outcome:
            'Designed to enable complex user journeys and real-time data handling for improved lead capture and routing.',
        images: [
            {
                key: 'home',
                src: flow_1,
                description:
                    'Allows multiple steps to be shown sequentially, with conditional logic to determine which steps and questions to show based on user input.',
            },
            {
                key: 'step1',
                src: flow_2,
                description:
                    'Uses webhooks to send data to external systems in real-time, with the ability to use results for further conditional logic.',
            },
            {
                key: 'step2',
                src: flow_3,
                description:
                    'Use comparison operators, and branches to determine the user path.',
            },
            {
                key: 'step3',
                src: flow_4,
                description:
                    'A built in page editor can preview the form, with the ability to add custom HTML and CSS where needed.',
            },
            {
                key: 'step4',
                src: flow_5,
                description:
                    'Pre-defined default fields as well as the ability to add more fields with multiple types and options.',
            },
            {
                key: 'step5',
                src: flow_6,
                description:
                    'Freedom to customize fields with multiple answers and more advanced settings',
            },
        ],
    },
    {
        title: 'Coreg.Software',
        summary:
            'Co-registration platform used to create web forms with conditional logic. Supports API and webhook delivery into external lead systems.',
        stack: 'PHP, Laravel, API/Webhooks, jQuery, Form Workflows',
        outcome:
            'Enabled faster lead routing and easier campaign operations across multiple channels.',
        images: [
            {
                key: 'home',
                src: coreg,
                description:
                    'Coreg.Software landing page introducing the platform and its lead-capture workflow.',
            },
            {
                key: 'step1',
                src: coreg_1,
                description:
                    'Dashboard showing a summary of important information.',
            },
            {
                key: 'step2',
                src: coreg_2,
                description: 'Users can create their own pages.',
            },
            {
                key: 'step3',
                src: coreg_3,
                description:
                    'The path is where the user creates steps and adds questions or other items to the form. This is also where actions and conditional logic can be added for the forms.',
            },
            {
                key: 'step4',
                src: coreg_4,
                description:
                    'Different question types can be created with the ability to add and re-order options where applicable.',
            },
            {
                key: 'step5',
                src: coreg_5,
                description:
                    'Conditional statements determine the flow of the user through the path, hiding and showing questions based on user input.',
            },
            {
                key: 'step6',
                src: coreg_6,
                description:
                    'Actions allow users to select what happens with user data after submission. It can send emails, forward details to an API or external lead management systems. It also supports its own conditions to decide if the action should run.',
            },
            {
                key: 'step7',
                src: coreg_7,
                description:
                    'Every action that gets performed is saved with the result of that action, so that activity can be monitored and issues can be troubleshooted.',
            },
        ],
    },
    {
        title: 'CashBag.co',
        summary:
            'Rewards system that connects into affiliate marketing networks to issue cashback rewards on selected purchases.',
        stack: 'PHP, Integrations, Transaction Flows',
        outcome:
            'Improved engagement through automated rewards and partner-network integrations.',
        images: [
            {
                key: 'home',
                src: cashbag_home,
                description:
                    'CashBag home screen introducing cashback offers and the user value proposition.',
            },
            {
                key: 'step1',
                src: cashbag_1,
                description:
                    'Offer listing view where users can browse partner promotions and cashback options.',
            },
            {
                key: 'step2',
                src: cashbag_2,
                description:
                    'Transaction flow showing how user activity is converted into cashback rewards.',
            },
            {
                key: 'step3',
                src: cashbag_3,
                description:
                    'Member account area for checking reward status and cashback progress.',
            },
        ],
    },
    {
        title: 'Sites built on Coreg.Software',
        summary:
            'Dozens of co-registration sites built for clients in various industries, using the Coreg.Software platform to create custom lead capture forms and campaigns.',
        stack: 'PHP, Laravel, In-house tools',
        outcome:
            'Provided better campaign tracking and improved user experience for various application processes.',
        images: [
            {
                key: 'home',
                src: uapply_1,
                description:
                    'uApply lets users apply for Finance related quotes. The leads are sent to multiple financial lead buyers.',
            },
            {
                key: 'step1',
                src: cashbag_1,
                description:
                    'Application capture screen collecting user details for the submission workflow.',
            },
            {
                key: 'step2',
                src: cashbag_2,
                description:
                    'Tracking interface for monitoring activity, link performance, or submission progress.',
            },
            {
                key: 'step3',
                src: cashbag_3,
                description:
                    'Management view summarizing campaign insight and application funnel activity.',
            },
        ],
    },
];

const roleTimeline = [
    {
        role: 'Lead Developer',
        company: 'OfferForge / Coreg.Software',
        period: '09/2023 - 04/2026',
        highlights: [
            'Led code reviews and team collaboration to improve quality and delivery speed.',
            'Guided architecture and optimization decisions to reduce downtime and improve efficiency.',
            'Deployed secure updates and patches while minimizing disruption in production systems.',
        ],
    },
    {
        role: 'PHP Web Developer',
        company: 'OfferForge',
        period: '05/2012 - 09/2023',
        highlights: [
            'Built and maintained responsive websites and web applications.',
            'Implemented API integrations, database-backed features, and performance improvements.',
            'Delivered clean, error-free code aligned with scope and deadlines.',
        ],
    },
    {
        role: 'Graphic Designer',
        company: 'OfferForge / Kowabunga Technologies',
        period: '11/2004 - 05/2012',
        highlights: [
            'Produced client-focused visual assets and web graphics.',
            'Adapted designs to brand guidelines and functional requirements.',
            'Supported SEO and content design improvements for web projects.',
        ],
    },
];

const strengths = [
    'PHP, Laravel, and modern web application architecture',
    'JavaScript, TypeScript, React, and jQuery development',
    'API integration, server management, and performance optimization',
    'WordPress, WooCommerce, and Elementor implementation',
    'Team leadership, mentoring, and code quality ownership',
    'Graphic design tools: Photoshop, Illustrator, Blender',
];

const escapeHtml = (value: string) =>
    value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#39;');

const buildGalleryCaption = (
    project: FeaturedProject,
    image: FeaturedProjectImage,
    index: number,
) =>
    `<div><h4>${escapeHtml(project.title)}</h4><p>${escapeHtml(image.description ?? project.summary)}</p><p>Image ${index + 1} of ${project.images.length}</p></div>`;

export default function Portfolio() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <>
            <Head title="Eugene Benade | Portfolio" />

            <div className={'mx-auto max-w-full bg-cover bg-center'}>
                <Navbar
                    appearance={appearance}
                    updateAppearance={updateAppearance}
                ></Navbar>
                <section
                    className="hero relative overflow-hidden border-b-2 border-amber-500 bg-linear-to-br from-background via-background to-[#F6911E]/10 p-8 shadow-lg shadow-amber-500/40 md:p-30"
                    style={{
                        backgroundImage: `url(${backgroundImage2})`,
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                        backgroundSize: 'cover',
                    }}
                >
                    <div
                        className="absolute top-0 left-0 h-full w-full"
                        style={{
                            background:
                                'linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)',
                        }}
                    />
                    <div className="absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-amber-500/15 blur-3xl" />

                    <div className="relative mx-auto flex max-w-6xl flex-row items-start justify-between gap-8 space-y-6 md:gap-20">
                        <div className="flex w-1/4 flex-col items-center gap-8 md:gap-10">
                            <div
                                className={
                                    'photo-container border-2 border-amber-500'
                                }
                            >
                                <img
                                    src={eugene}
                                    alt="Eugene Benade"
                                    className="w-full"
                                />
                            </div>

                            <div className="font-ubuntu w-full text-amber-500">
                                <h2 className={'text-3xl font-bold'}>
                                    Eugene Benade
                                </h2>

                                <span className={'text-xl'}>
                                    Full Stack Web Developer
                                </span>
                            </div>
                            <ul className={'flex w-full flex-col gap-3'}>
                                <li className="flex flex-row items-center gap-2 text-sm">
                                    <MapPinIcon size={25} />
                                    Pretoria, South Africa
                                </li>
                                <li className="flex flex-row items-center gap-2 text-sm">
                                    <PhoneIcon size={25} />
                                    +27 82 992 1317
                                </li>
                                <li className="flex flex-row items-center gap-2 text-sm">
                                    <EnvelopeSimpleIcon size={25} />
                                    benade@gmail.com
                                </li>
                                <li className="flex flex-row items-center gap-2 text-sm">
                                    <GlobeSimpleIcon size={25} />
                                    https://benade.net
                                </li>
                            </ul>
                        </div>

                        <div className={'flex flex-col gap-8'}>
                            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                                Full Stack Developer delivering robust PHP and
                                Laravel platforms with modern React frontends.
                            </h1>

                            <p className="max-w-3xl text-base leading-7 sm:text-lg">
                                I'm a lead web developer with strengths in team
                                leadership and quality assurance.
                            </p>
                            <p className="max-w-3xl text-base leading-7 sm:text-lg">
                                I focus on continuous improvement through code
                                reviews, architecture decisions, and delivery
                                aligned with business goals.
                            </p>

                            <div className="grid gap-5 md:grid-cols-3">
                                {impactStats.map((stat) => (
                                    <article
                                        key={stat.label}
                                        className="rounded-2xl border border-[#F6911E]/25 bg-card p-5"
                                    >
                                        <p className="text-xl font-semibold tracking-tight">
                                            {stat.value}
                                        </p>
                                        <p className="mt-2 text-sm text-muted-foreground">
                                            {stat.label}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="relative flex flex-col gap-20 space-y-6 bg-stone-100 p-8 md:p-30 dark:bg-stone-900">
                    <div
                        style={{
                            height: '100%',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            zIndex: '0',
                        }}
                    >
                        <LightRays
                            raysOrigin="top-center"
                            raysColor="#FFD19F"
                            raysSpeed={1}
                            lightSpread={0.9}
                            rayLength={3}
                            followMouse={false}
                            mouseInfluence={0.1}
                            noiseAmount={0}
                            distortion={0}
                            className="custom-rays w-full"
                            pulsating={false}
                            fadeDistance={1}
                            saturation={3}
                        />
                    </div>
                    <div className="relative mx-auto max-w-6xl space-y-6">
                        <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-amber-500">
                            <CodeIcon size={30} weight="duotone" aria-hidden />
                            <span>Development focus</span>
                        </h2>

                        <div className="grid gap-5 md:grid-cols-3">
                            {capabilities.map((capability) => (
                                <article
                                    key={capability.title}
                                    className="rounded-2xl border-2 border-amber-500 bg-stone-100/80 p-6 shadow-lg shadow-amber-500/40 blur-in-lg dark:bg-stone-800/80"
                                >
                                    <h3 className="text-lg font-semibold">
                                        {capability.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6">
                                        {capability.detail}
                                    </p>

                                    <p className="mt-4 text-xs font-medium tracking-wide uppercase">
                                        {capability.stack.join(' - ')}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                    <div className="relative mx-auto max-w-6xl space-y-6">
                        <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-amber-500">
                            <BriefcaseIcon
                                size={30}
                                weight="duotone"
                                aria-hidden
                            />
                            <span>Experience</span>
                        </h2>

                        <div className="grid gap-5 md:grid-cols-3">
                            {roleTimeline.map((role) => (
                                <article
                                    key={role.role}
                                    className="rounded-2xl border-2 border-amber-500 p-6"
                                >
                                    <p className="text-xs font-medium tracking-wide text-amber-500 uppercase">
                                        {role.period}
                                    </p>
                                    <h3 className="mt-2 text-lg font-semibold">
                                        {role.role}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {role.company}
                                    </p>

                                    <ul className="mt-4 space-y-2 text-sm leading-6 list-disc pl-5">
                                        {role.highlights.map((point) => (
                                            <li key={point}>{point}</li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="space-y-6 bg-stone-100 p-8 md:p-30 dark:bg-stone-800">
                    <div className="relative mx-auto max-w-6xl space-y-6">
                        <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-amber-500">
                            <ImagesIcon size={30} weight="duotone" aria-hidden />
                            <span>Featured work</span>
                        </h2>

                        <div>
                            {featuredProjects.map((project) => (
                                <div
                                    key={project.title}
                                    className="margin-bottom-12 mb-10 space-y-4 rounded-2xl bg-stone-600 p-5"
                                >
                                    <h3 className="text-2xl font-semibold text-amber-500">
                                        {project.title}
                                    </h3>
                                    <p className="mt-2 mb-5">
                                        {project.summary}
                                    </p>
                                    <LightGallery
                                        plugins={[lgZoom, lgThumbnail]}
                                        selector={`.featured-gallery-item-${project.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`}
                                        download={false}
                                    >
                                        <Swiper spaceBetween={50} slidesPerView={3}>
                                            {project.images.map(
                                                (
                                                    { key, src, description },
                                                    index,
                                                ) => (
                                                    <SwiperSlide
                                                        key={`${project.title}-${key}`}
                                                        className="featured-gallery-slide"
                                                    >
                                                        <div className="flex flex-col gap-2">
                                                            <a
                                                                href={src}
                                                                className={`featured-gallery-item-${project.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase()} block w-full cursor-pointer overflow-hidden rounded-xl h-40`}
                                                                data-src={src}
                                                                data-sub-html={buildGalleryCaption(
                                                                    project,
                                                                    {
                                                                        key,
                                                                        src,
                                                                        description,
                                                                    },
                                                                    index,
                                                                )}
                                                                aria-label={`Open ${project.title} image ${index + 1} in gallery`}
                                                            >
                                                                <img
                                                                    src={src}
                                                                    alt={`${project.title} - ${key} (${index + 1})`}
                                                                    className="h-auto w-full"
                                                                />
                                                            </a>
                                                            {(description ?? project.summary) && (
                                                                <p className="text-xs leading-5 text-stone-300">
                                                                    {description ?? project.summary}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </SwiperSlide>
                                                ),
                                            )}
                                        </Swiper>
                                    </LightGallery>

                                    <p className="mt-4 font-medium">
                                        {project.stack}
                                    </p>

                                    <p className="mt-4 rounded-lg border-2 border-amber-400 bg-stone-700 p-3 text-xs leading-5">
                                        {project.outcome}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="relative space-y-4 p-8 md:p-30">
                    <div
                        style={{
                            height: '100%',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            zIndex: '0',
                        }}
                    >
                        <Galaxy
                            mouseRepulsion
                            mouseInteraction={false}
                            density={0.5}
                            glowIntensity={0.1}
                            saturation={0}
                            hueShift={140}
                            twinkleIntensity={0.3}
                            rotationSpeed={0.05}
                            repulsionStrength={2}
                            autoCenterRepulsion={0}
                            starSpeed={0.5}
                            speed={1}
                        />
                    </div>
                    <div className="relative mx-auto max-w-6xl space-y-6">
                        <h2 className="flex items-center gap-3 text-3xl font-semibold tracking-tight text-amber-500">
                            <WrenchIcon size={30} weight="duotone" aria-hidden />
                            <span>Skills</span>
                        </h2>

                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {strengths.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-xl border-2 border-amber-500 bg-stone-100/80 px-4 py-3 blur-in-lg dark:bg-stone-800/80"
                                >
                                    <span className="text-sm">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
                <section className="border-t-2 border-amber-500 bg-stone-900 p-8">
                    <div className="relative mx-auto max-w-6xl space-y-6">
                        <h2 className="flex items-center gap-3 text-3xl font-semibold text-amber-500">
                            <PaperPlaneTiltIcon
                                size={30}
                                weight="duotone"
                                aria-hidden
                            />
                            <span>Contact Me</span>
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            I'm always open to new opportunities, so feel free
                            to reach out.
                        </p>

                        <div className="mt-8">
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

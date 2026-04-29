"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Container from "../ui/container";
import { colors } from "@/src/constants/colors";

const contactDetails = [
  {
    title: "Phone Number",
    value: "071 2293300",
    icon: Phone,
    href: "tel:0712293300",
  },
  {
    title: "Whatsapp",
    value: "072 2293300",
    icon: MessageCircle,
    href: "https://wa.me/94722293300",
  },
  {
    title: "Email Address",
    value: "ruhunumatara20@mail.com",
    icon: Mail,
    href: "mailto:ruhunumatara20@mail.com",
  },
  {
    title: "Location",
    value: "Matara,Sri Lanka",
    icon: MapPin,
    href: "https://www.google.com/maps/search/?api=1&query=Matara%2CSri%20Lanka",
  },
];

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern = /^\+?[0-9()\-\s]{7,}$/;

function validateField(name: keyof FormValues, value: string) {
  const trimmedValue = value.trim();

  switch (name) {
    case "name":
      return trimmedValue ? "" : "Name is required.";
    case "email":
      if (!trimmedValue) {
        return "Email address is required.";
      }

      return emailPattern.test(trimmedValue)
        ? ""
        : "Please enter a valid email address.";
    case "phone":
      if (!trimmedValue) {
        return "Phone number is required.";
      }

      return phonePattern.test(trimmedValue)
        ? ""
        : "Please enter a valid phone number.";
    case "subject":
      return trimmedValue ? "" : "Subject is required.";
    case "message":
      return trimmedValue ? "" : "Message is required.";
    default:
      return "";
  }
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [formValues, setFormValues] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-animate",
        {
          y: 32,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;

    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    if (formErrors[fieldName]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [fieldName]: validateField(fieldName, value),
      }));
    }

    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
    }
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof FormValues;

    setFormErrors((currentErrors) => ({
      ...currentErrors,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = Object.entries(formValues).reduce<FormErrors>(
      (accumulator, [key, value]) => {
        const fieldName = key as keyof FormValues;
        const errorMessage = validateField(fieldName, value);

        if (errorMessage) {
          accumulator[fieldName] = errorMessage;
        }

        return accumulator;
      },
      {},
    );

    setFormErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      setSubmitMessage("");
      return;
    }

    if (!serviceId || !templateId || !publicKey) {
      setSubmitState("error");
      setSubmitMessage("Email service is not configured.");
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          subject: formValues.subject,
          message: formValues.message,
        },
        publicKey,
      );

      setSubmitState("success");
      setSubmitMessage("Thank you contect us , email sent successfully");
      setFormValues(initialValues);
      setFormErrors({});
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to send email.";

      setSubmitState("error");
      setSubmitMessage(message);
    }
  };

  const fieldHasError = (fieldName: keyof FormValues) =>
    Boolean(formErrors[fieldName]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="scroll-mt-20 w-full py-16 sm:py-20"
      style={{ backgroundColor: colors.background }}
    >
      <Container>
        <div className="mx-auto w-full max-w-[1240px]">
          <div className="contact-animate mb-10 text-center sm:mb-14">
            <h2 className="text-4xl font-semibold tracking-[0.01em] sm:text-5xl lg:text-6xl">
              Contact Us
            </h2>
            <div
              className="mx-auto mt-4 h-px w-45"
              style={{
                background: `linear-gradient(to right, transparent, ${colors.accentSoft}, transparent)`,
              }}
            />
          </div>

          <div className="mt-8 grid items-start gap-10 sm:mt-10 sm:grid-cols-2 sm:gap-8 md:mt-12 md:grid-cols-[0.95fr_1.05fr] md:gap-10 lg:mt-14 lg:gap-14 xl:gap-20">
            {/* Left Content */}
            <div className="w-full">
              <p className="contact-animate max-w-[520px] text-[1rem] font-normal leading-[1.7] text-white sm:text-[1.05rem] md:text-[1.1rem] lg:text-[1.12rem]">
                Get in touch with us for inquiries, product details, or
                assistance. We&apos;re here to help you choose the perfect
                fireworks for your celebration
              </p>

              <div className="mt-10 flex flex-col gap-5 sm:mt-12 sm:gap-6">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const isExternalLink = item.href.startsWith("http");

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      target={isExternalLink ? "_blank" : undefined}
                      rel={isExternalLink ? "noopener noreferrer" : undefined}
                      className="contact-animate group flex items-center gap-4 rounded-lg transition sm:gap-5"
                      aria-label={`${item.title}: ${item.value}`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D90000] transition group-hover:scale-105 sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                      </div>

                      <div>
                        <h3 className="text-[0.9rem] font-semibold leading-tight text-white sm:text-[1rem] md:text-[1.1rem]">
                          {item.title}
                        </h3>

                        <p className="mt-1 break-words text-[0.85rem] font-medium leading-tight text-white transition group-hover:text-white/80 sm:text-[0.95rem] md:text-[1rem]">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Right Form */}
            <div className="contact-animate w-full rounded-[1.4rem] border border-white/55 bg-[#0B1120] px-6 py-7 shadow-[0_0_45px_rgba(255,255,255,0.03)] sm:max-w-[500px] sm:justify-self-end sm:rounded-[1.7rem] sm:px-7 sm:py-8 md:max-w-[560px] md:px-9 lg:px-9 xl:px-10">
              <h3 className="text-[1.3rem] font-semibold text-white sm:text-[1.45rem] md:text-[1.55rem]">
                Your Details
              </h3>

              <form className="mt-7" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-6 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="name"
                      className="block text-[1rem] font-medium text-white sm:text-[1.05rem]"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your Name"
                      value={formValues.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={fieldHasError("name")}
                      className={`mt-3 w-full border-0 border-b bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 ${
                        fieldHasError("name")
                          ? "border-red-400"
                          : "border-white/25"
                      }`}
                    />
                    {formErrors.name ? (
                      <p className="mt-2 text-xs text-red-400">
                        {formErrors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="block text-[1rem] font-medium text-white sm:text-[1.05rem]"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="Your Phone Number"
                      value={formValues.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={fieldHasError("phone")}
                      className={`mt-3 w-full border-0 border-b bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 ${
                        fieldHasError("phone")
                          ? "border-red-400"
                          : "border-white/25"
                      }`}
                    />
                    {formErrors.phone ? (
                      <p className="mt-2 text-xs text-red-400">
                        {formErrors.phone}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-7 grid gap-6 sm:grid-cols-2 sm:gap-6">
                  <div className="w-full">
                    <label
                      htmlFor="email"
                      className="block text-[1rem] font-medium text-white sm:text-[1.05rem]"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formValues.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={fieldHasError("email")}
                      className={`mt-3 w-full border-0 border-b bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 ${
                        fieldHasError("email")
                          ? "border-red-400"
                          : "border-white/25"
                      }`}
                    />
                    {formErrors.email ? (
                      <p className="mt-2 text-xs text-red-400">
                        {formErrors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="w-full">
                    <label
                      htmlFor="subject"
                      className="block text-[1rem] font-medium text-white sm:text-[1.05rem]"
                    >
                      Subject
                    </label>

                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="Message Subject"
                      value={formValues.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={fieldHasError("subject")}
                      className={`mt-3 w-full border-0 border-b bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 ${
                        fieldHasError("subject")
                          ? "border-red-400"
                          : "border-white/25"
                      }`}
                    />
                    {formErrors.subject ? (
                      <p className="mt-2 text-xs text-red-400">
                        {formErrors.subject}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="mt-8">
                  <label
                    htmlFor="message"
                    className="block text-[1rem] font-medium text-white sm:text-[1.05rem]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    placeholder="Message Subject"
                    value={formValues.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={fieldHasError("message")}
                    className={`mt-3 w-full resize-none border-0 border-b bg-transparent pb-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-white/70 ${
                      fieldHasError("message")
                        ? "border-red-400"
                        : "border-white/25"
                    }`}
                  />
                  {formErrors.message ? (
                    <p className="mt-2 text-xs text-red-400">
                      {formErrors.message}
                    </p>
                  ) : null}
                </div>

                <div className="mt-10 flex justify-center">
                  {submitState === "success" || submitState === "error" ? (
                    <p
                      className={`text-center text-sm font-semibold sm:text-base ${
                        submitState === "success"
                          ? "text-emerald-300"
                          : "text-red-400"
                      }`}
                    >
                      {submitMessage}
                    </p>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitState === "sending"}
                      className="min-w-[150px] rounded-lg border border-white/45 bg-[#4B5160] px-10 py-3 text-[1.1rem] font-semibold text-white transition duration-300 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-70 sm:min-w-[170px] sm:text-[1.2rem]"
                    >
                      {submitState === "sending" ? "Sending..." : "Send"}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
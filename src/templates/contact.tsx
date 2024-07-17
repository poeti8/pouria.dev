import React, { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, graphql } from "gatsby";
import ScrollSVG from "../../content/assets/scroll.svg";
import { globalHistory } from '@reach/router'

import 'react-photo-view/dist/react-photo-view.css';

import Layout from "../components/layout";
import SEO from "../components/seo";
import { AnimationContext, ContactAnimationContext, ContactSubmitAnimationContext } from "../components/root";
import { SERVER_URL } from "../utils";

interface Props {
  data: any;
  location: any;
}

const PageTemplate: FC<Props> = ({ location }) => {
  const animation = useContext(AnimationContext);
  const [contactAnimation, setContactAnimation] = useContext(ContactAnimationContext);
  const [contactSubmitAnimation, setContactSubmitAnimation] = useContext(ContactSubmitAnimationContext);
  const [showScroll, setShowScroll] = useState(true);
  const [defaultValue] = useState(`Dear Pouria,\n`);
  const [value, setValue] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const defaultValueIndex = useRef(0);
  const textareaRef = useRef();
  const formRef = useRef();
  
  useEffect(() => {
    document.body.classList.add("contact");
    return () => {
      document.body.classList.remove("contact");
    }
  }, []);
  
  const setDefaultValue = useMemo(() => function() {
    if (!textareaRef.current) return;
    const index = parseInt(defaultValueIndex.current);
    if (defaultValue.length === index - 1) {
      return;
    }
    textareaRef.current.value = defaultValue.slice(0, index);
    defaultValueIndex.current += 1;
    setTimeout(() => {
      setDefaultValue();
    }, 200);
  }, []);
  
  useEffect(() => {
    if (contactSubmitAnimation) return;
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    setContactAnimation(true);
    if (contactAnimation && textareaRef.current) {
      textareaRef.current.value = defaultValue;
      document.body.classList.remove("contact-animation");
      return;
    }
    if (animation) {
      setShowScroll(false);
      setTimeout(() => {
        setShowScroll(true);
      }, 1500);
    } else {
      document.body.classList.add("contact-animation");
      setTimeout(() => {
        setDefaultValue();
      }, 800);
    }
  }, [animation, contactSubmitAnimation]);

  useEffect(() => {
    if (animation && showScroll && !contactSubmitAnimation) {
      document.body.classList.add("contact-animation");
      setTimeout(() => {
        setDefaultValue();
      }, 800);
    }
  }, [animation, showScroll, contactSubmitAnimation]);

  useEffect(() => {
    if (contactSubmitAnimation) {
      document.body.classList.remove("contact-animation");
      document.body.classList.remove("contact-submit-animation");
      document.body.classList.remove("contact-sent");
      document.body.classList.add("contact-sent");
    }
  }, [contactSubmitAnimation])

  const handleSubmit = useMemo(() => async function(e) {
    e.preventDefault();
    if (isSending || isSent || contactSubmitAnimation) return;
    setIsSending(true);
    setErrorMessage(null);
    const form = formRef.current;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    if (typeof message !== "string" || message.trim().toLowerCase().replace("dear pouria,", "").length === 0) {
      setErrorMessage("You haven't written anything yet.");
      setIsSending(false);
      return;
    }
    try {
      const res = await fetch(`${SERVER_URL}/contact`, { 
        method: "POST", 
        body: JSON.stringify({ message, name, email }), 
        headers: {
          "Content-Type": "application/json",
        }, 
      });
      console.log(res);
      if (res.status !== 200) {
        throw new Error();
      }
      document.body.classList.remove("contact-animation");
      document.body.classList.add("contact-submit-animation");
      document.body.classList.add("contact-sent");
      setIsSent(true);
      setTimeout(() => {
        setContactSubmitAnimation(true);
      }, 1500);
    } catch (error) {
      setErrorMessage("Couldn't send the letter. Maybe try sending an e-mail instead?");
    }
    setIsSending(false);
  }, [isSending, isSent, contactSubmitAnimation]);

  return (
    <Layout location={location}>
      <SEO
        title="Contact"
        description="Send me a letter."
      />
      <>
          {showScroll ? (
            <>
              <div className="wavy-background"></div>
              <div className="c-form-wrapper">
                <form id="c-form" ref={formRef} onSubmit={handleSubmit}>
                  <input type="text" id="name" name="name" />
                  <input type="email" id="email" name="email" />
                  <textarea
                    id="message"
                    name="message"
                    ref={textareaRef}
                    autoComplete="off" 
                    autoCorrect="off" 
                    autoCapitalize="off" 
                    spellCheck="false"
                  />
                </form>
              </div>
              <ScrollSVG className="scroll top" />
              <ScrollSVG className="scroll bottom" />
              <p className="c-error-message">{errorMessage}</p>
              {isSent || contactSubmitAnimation ? <p className="c-sent-message">Your letter was sent. I shall receive it shortly.</p> : null}
              <button type="submit" form="c-form" className={`submit-c ${isSending ? "sending" : ""}`}>{isSending ? "Sending..." : isSent ? "Sent" : "Send"}</button>
            </>
          ) : null}
        </>
      <svg>
        <filter id="wavy2">
          <feTurbulence x="0" y="0" baseFrequency="0.02" numOctaves="5" seed="1"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
        <filter id="stamp">
          <feTurbulence x="0" y="0" baseFrequency="0.01 0.02" numOctaves="1" seed="2"></feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
      </svg>
    </Layout>
  );
};

export default PageTemplate;


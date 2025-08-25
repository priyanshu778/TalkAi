import React, { useContext, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./Talksection.css";
import Mode from "../Dark/Mode";
import sendimg from "../../assets/send.webp";
import { contextData } from "../../Context/UserContext";
import robot from "../../assets/robot.png";
import user from "../../assets/user.png";
import mic from '../../assets/mic.png';

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.toString().trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="code-block-wrapper">
      <button className="copy-button" onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <pre className="code-block">
        <code>{children}</code>
      </pre>
    </div>
  );
};

const Talksection = () => {
  const {
    sent,
    input,
    setInput,
    showResult,
    resultData,
    recentPrompt,
    loading,
  } = useContext(contextData);

   
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "dark-mode";
  });

  useEffect(() => {
     document.body.className = mode;   
  localStorage.setItem("mode", mode);
  }, [mode]);



  const handleVoiceInput = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Your browser does not support voice input.");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    sent(transcript); // send it directly
  };

  recognition.onerror = (event) => {
    console.error("Voice input error:", event.error);
  };

  recognition.start();
};


   
  const toggleMode = () => {
    setMode((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

  return (
    <div className={`talksection ${mode === "dark-mode" ? "dark-mode" : ""}`}>
      <div className="top-section">
        {!showResult ? (
          <div className="heading">
            <span className="fade-in">HELLO PRIYANSHU</span>
            <span className="slide-in">I'm Your TalkAi</span>
            <span className="zoom-in">What can I help You ... ?</span>
          </div>
        ) : (
          <div className="result">
            <div className="userbox">
              <img src={user} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="aibox">
              <img src={robot} alt="AI" />
              <div className="markdown-container">
                {loading ? (
                  <div className="load">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                ) : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        if (inline) {
                          return (
                            <code className="inline-code" {...props}>
                              {children}
                            </code>
                          );
                        }
                        return <CodeBlock>{String(children).trim()}</CodeBlock>;
                      },
                      p: ({ node, ...props }) => (
                        <p className="markdown-paragraph" {...props} />
                      ),
                      ul: ({ node, ...props }) => (
                        <ul className="markdown-list" {...props} />
                      ),
                      ol: ({ node, ...props }) => (
                        <ol className="markdown-list" {...props} />
                      ),
                      li: ({ node, ...props }) => (
                        <li className="markdown-list-item" {...props} />
                      ),
                      blockquote: ({ node, ...props }) => (
                        <blockquote className="markdown-blockquote" {...props} />
                      ),
                    }}
                  >
                    {resultData}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="buttom-section">
        <input
          type="text"
          placeholder="Write prompt here"
          onChange={(event) => setInput(event.target.value)}
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && input.trim()) {
              sent(input);
              setInput("");
            }
          }}
          
        />
        <button className="mic-button" onClick={handleVoiceInput}>
    <img src={mic} alt="Mic" />
  </button>
          

        {input && (
          <button
            id="sentbtn"
            onClick={() => {
              sent(input);
              setInput("");
            }}
          >
            <img src={sendimg} alt="Send" />
          </button>
        )}

        <Mode mode={mode} toggleMode={toggleMode} />
      </div>
    </div>
  );
};

export default Talksection;

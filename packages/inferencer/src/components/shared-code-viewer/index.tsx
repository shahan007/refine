import React, { SVGProps } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/vsDark";

import { CreateInferencerConfig } from "../../types";
import { prettierFormat } from "../../utilities";

export const SharedCodeViewer: CreateInferencerConfig["codeViewerComponent"] =
    ({ code: rawCode, loading }) => {
        const code = React.useMemo(() => {
            return prettierFormat(rawCode ?? "");
        }, [rawCode]);

        const [settled, setSettled] = React.useState(false);
        const [isModalVisible, setIsModalVisible] = React.useState(false);
        const [isVisible, setIsVisible] = React.useState(false);
        const [isColumn, setIsColumn] = React.useState(false);
        const [isModalButtonHover, setIsModalButtonHover] =
            React.useState(false);

        // Settled Check
        React.useEffect(() => {
            if (!loading) {
                const timeout = setTimeout(() => {
                    setSettled(true);
                }, 300);

                return () => {
                    clearTimeout(timeout);
                };
            }

            return () => undefined;
        }, [loading]);

        // Visibility Check
        React.useEffect(() => {
            if (typeof window !== "undefined") {
                const mediaQuery = window.matchMedia("(max-width: 449px)");
                if (mediaQuery.matches) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }

                const handleResize = () => {
                    if (mediaQuery.matches) {
                        setIsVisible(false);
                    } else {
                        setIsVisible(true);
                    }
                };

                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("resize", handleResize);
                };
            }

            return () => undefined;
        }, []);

        // Flex Direction Check
        React.useEffect(() => {
            if (typeof window !== "undefined") {
                const mediaQuery = window.matchMedia("(max-width: 1280px)");
                if (mediaQuery.matches) {
                    setIsColumn(true);
                } else {
                    setIsColumn(false);
                }

                const handleResize = () => {
                    if (mediaQuery.matches) {
                        setIsColumn(true);
                    } else {
                        setIsColumn(false);
                    }
                };

                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("resize", handleResize);
                };
            }

            return () => undefined;
        }, []);

        if (code && !loading) {
            return (
                <>
                    {isVisible && (
                        <div
                            style={{
                                position: "sticky",
                                bottom: "24px",
                                paddingTop: "24px",
                                left: 0,
                                right: 0,
                                width: "100%",
                                zIndex: 10,
                                display: "flex",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                                opacity: settled && !isModalVisible ? 1 : 0,
                                transform:
                                    settled && !isModalVisible
                                        ? "translateY(0)"
                                        : "translateY(100px)",
                            }}
                        >
                            <div
                                style={{
                                    width: "calc(100% - calc(64px * 2))",
                                    maxWidth: "1080px",
                                    padding: "20px",
                                    backgroundColor: "#1A1A1A",
                                    boxShadow:
                                        "0px 4px 16px -4px rgba(0, 0, 0, 0.5), 0px 8px 32px -8px rgba(0, 0, 0, 0.35)",
                                    borderRadius: "16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    flexDirection: isColumn ? "column" : "row",
                                    gap: "12px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: "8px",
                                    }}
                                >
                                    <div>
                                        <InfoIcon />
                                    </div>
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            color: "#ffffff",
                                        }}
                                    >
                                        <p
                                            style={{
                                                padding: 0,
                                                margin: 0,
                                            }}
                                        >
                                            Most of the page code is
                                            auto-generated by the{" "}
                                            <span
                                                style={{
                                                    textDecoration: "underline",
                                                }}
                                            >
                                                Inferencer
                                            </span>{" "}
                                            feature, based on your backend data
                                            structure.
                                        </p>
                                        <p
                                            style={{
                                                padding: 0,
                                                margin: 0,
                                            }}
                                        >
                                            While this is an excellent way to
                                            experiment with refine,{" "}
                                            <span style={{ fontWeight: 600 }}>
                                                it&apos;s not intended to be
                                                used on production.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onPointerEnter={() =>
                                            setIsModalButtonHover(true)
                                        }
                                        onPointerLeave={() =>
                                            setIsModalButtonHover(false)
                                        }
                                        onClick={() => setIsModalVisible(true)}
                                        style={{
                                            appearance: "none",
                                            border: "none",
                                            padding: "10px 16px",
                                            borderRadius: "4px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            background: "#0080FF",
                                            color: "#ffffff",
                                            fontSize: "14px",
                                            lineHeight: "20px",
                                            fontWeight: 600,
                                            gap: "8px",
                                            cursor: "pointer",
                                            transition: "all 0.2s ease",
                                            transform: isModalButtonHover
                                                ? "scale(1.025)"
                                                : undefined,
                                            filter: isModalButtonHover
                                                ? "brightness(1.1)"
                                                : undefined,
                                        }}
                                    >
                                        <OpenIcon
                                            style={{
                                                flexShrink: 0,
                                            }}
                                        />
                                        <span>
                                            Show the auto-generated code
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <CodeModal
                        visible={isModalVisible}
                        onClose={() => setIsModalVisible(false)}
                        code={code}
                    />
                </>
            );
        }

        return null;
    };

const CodeModal = ({
    visible,
    onClose,
    code = "",
}: {
    visible: boolean;
    onClose: () => void;
    code?: string;
}) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    const [isCopied, setIsCopied] = React.useState(false);
    const [isCopyHover, setIsCopyHover] = React.useState(false);
    const [isCloseHover, setIsCloseHover] = React.useState(false);
    const [isLearnMoreHover, setIsLearnMoreHover] = React.useState(false);

    // On Outside Click
    React.useEffect(() => {
        if (typeof document !== "undefined") {
            const onOutsideClick = (event: PointerEvent) => {
                if (
                    modalRef.current &&
                    !modalRef.current.contains(event.target as Node)
                ) {
                    onClose();
                }
            };

            document.addEventListener("pointerdown", onOutsideClick);

            return () => {
                document.removeEventListener("pointerdown", onOutsideClick);
            };
        }

        return () => undefined;
    }, [onClose]);

    // onCopy Handler
    const onCopy = () => {
        if (typeof navigator !== "undefined") {
            navigator.clipboard.writeText(code);
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 1000);
        }
    };

    const title = (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "32px",
                    color: "#0D0D0D",
                }}
            >
                Auto-generated code by Inferencer
            </div>
            <button
                onClick={onClose}
                onPointerEnter={() => setIsCloseHover(true)}
                onPointerLeave={() => setIsCloseHover(false)}
                style={{
                    flexShrink: 0,
                    appearance: "none",
                    border: "none",
                    background: "none",
                    padding: 0,
                    margin: 0,
                    outline: "none",
                    borderRadius: "50px",
                    width: "32px",
                    height: "32px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    transform: isCloseHover ? "scale(1.05)" : undefined,
                    filter: isCloseHover ? "brightness(0.8)" : undefined,
                }}
            >
                <CloseIcon />
            </button>
        </div>
    );

    const highlight = (
        <div
            style={{
                fontSize: "13px",
                borderRadius: "8px",
                flex: "1",
                overflow: "scroll",
                background: "#1E1E1E",
            }}
        >
            <Highlight
                {...defaultProps}
                theme={theme}
                code={code}
                language="tsx"
            >
                {({
                    className,
                    style,
                    tokens,
                    getLineProps,
                    getTokenProps,
                }) => (
                    <pre
                        className={className}
                        style={{
                            ...style,
                            padding: "14px 14px 14px 14px",
                            margin: "0",
                            width: "100%",
                            boxSizing: "border-box",
                        }}
                    >
                        {tokens.map((line, i) => (
                            <div
                                key={i}
                                {...getLineProps({
                                    line,
                                    key: i,
                                })}
                            >
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({
                                            token,
                                            key,
                                        })}
                                    />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </div>
    );

    const buttons = (
        <div
            style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-end",
                gap: "16px",
            }}
        >
            <button
                onPointerEnter={() => setIsCopyHover(true)}
                onPointerLeave={() => setIsCopyHover(false)}
                onClick={onCopy}
                style={{
                    appearance: "none",
                    height: "40px",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#0080FF",
                    color: "#ffffff",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    gap: "8px",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "filter 0.2s ease",
                    transform: isCopyHover ? "scale(1.025)" : "scale(1)",
                    filter: isCopyHover ? "brightness(1.1)" : undefined,
                }}
            >
                <ClipboardIcon
                    style={{
                        flexShrink: 0,
                        marginTop: "-2px",
                        marginBottom: "-2px",
                    }}
                />
                <span>Copy Generated Code</span>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#0080FF",
                        transition: "all 0.2s ease",
                        transform: isCopied
                            ? "translateY(0)"
                            : "translateY(40px)",
                    }}
                >
                    <ClipboardIcon
                        style={{
                            flexShrink: 0,
                            marginTop: "-2px",
                            marginBottom: "-2px",
                        }}
                    />
                    <span>Copied!</span>
                </div>
            </button>
            <a
                onPointerEnter={() => setIsLearnMoreHover(true)}
                onPointerLeave={() => setIsLearnMoreHover(false)}
                href="https://refine.dev/docs/packages/documentation/inferencer"
                target="_blank"
                rel="noreferrer"
                style={{
                    appearance: "none",
                    textDecoration: "none",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0, 128, 255, 0.1)",
                    color: "#0080FF",
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 600,
                    gap: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    transform: isLearnMoreHover ? "scale(1.025)" : undefined,
                    filter: isLearnMoreHover ? "brightness(1.1)" : undefined,
                }}
            >
                <OpenIcon
                    style={{
                        flexShrink: 0,
                    }}
                />
                <span>Learn more about inferencer</span>
            </a>
        </div>
    );

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                transition: "all 0.2s ease",
                opacity: visible ? 1 : 0,
                pointerEvents: visible ? "all" : "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                ref={modalRef}
                style={{
                    transform: visible
                        ? "scale(1) translateY(0px)"
                        : "scale(0) translateY(-200px)",
                    transition: "all 0.25s cubic-bezier(.35,1.29,.81,1.08)",
                    transitionDelay: "0.25",
                    width: "calc(100% - calc(32px * 2))",
                    height: "calc(100% - calc(32px * 2))",
                    backgroundColor: "#fff",
                    maxWidth: "640px",
                    maxHeight: "720px",
                    borderRadius: "8px",
                    padding: "16px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        gap: "16px",
                    }}
                >
                    {title}
                    {highlight}
                    {buttons}
                </div>
            </div>
        </div>
    );
};

const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <path
            fill="#0080FF"
            fillRule="evenodd"
            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-15a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 10 5Zm0 10c.69 0 1.25-.56 1.25-1.25V10a1.25 1.25 0 1 0-2.5 0v3.75c0 .69.56 1.25 1.25 1.25Z"
            clipRule="evenodd"
        />
    </svg>
);

const OpenIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            d="M5 2a1 1 0 0 1 0 2H4v8h8v-1a1 1 0 1 1 2 0v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1Z"
        />
        <path
            fill="currentColor"
            d="M9 2a1 1 0 0 0 0 2h1.586L6.293 8.293a1 1 0 0 0 1.414 1.414L12 5.414V7a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1H9Z"
        />
    </svg>
);

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        fill="none"
        {...props}
    >
        <path
            fill="#A6A6A6"
            fillRule="evenodd"
            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16Zm-2.586-21.414a2 2 0 1 0-2.828 2.828L13.172 16l-2.586 2.586a2 2 0 1 0 2.828 2.828L16 18.828l2.586 2.586a2 2 0 1 0 2.828-2.828L18.828 16l2.586-2.586a2 2 0 1 0-2.828-2.828L16 13.172l-2.586-2.586Z"
            clipRule="evenodd"
        />
    </svg>
);

const ClipboardIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        {...props}
    >
        <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1Zm0 7a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H9Z"
            clipRule="evenodd"
        />
        <path fill="currentColor" d="M13 4a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z" />
    </svg>
);

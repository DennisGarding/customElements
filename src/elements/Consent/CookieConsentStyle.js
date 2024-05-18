import { css } from 'lit';
import { Colors } from "../../Colors";

const CookieConsentStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .hidden {
        display: none;
        height: 0;
        width: 0;
        visibility: hidden;
    }

    .overlay {
        z-index: 1100;
        background-color: ${Colors.overlayBackground};
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        overflow: hidden;
        display: flex;
    }

    .inner-overlay {
        z-index: 1101;
        width: 100%;
        align-self: flex-end;
        min-height: 5rem;

        .container {
            max-width: 1600px;
            min-height: 5rem;
            background: ${Colors.primaryBackground};
            margin: 1.5rem auto;
            padding: 1.5rem;

            .text-container {
                padding: 1rem;

                .title {
                    font-weight: bolder;
                    margin-bottom: 1rem;
                }

                .text {
                    line-height: 1.5rem;
                }
            }

            .checkbox-container {
                padding: 1rem;

                .checkboxLabel {
                    display: block;
                    line-height: 1.5rem;

                    .checkbox {
                        border-radius: 3px;
                        width: 1rem;
                        height: 1rem;
                        border: 1px solid ${Colors.border};
                    }
                }
            }

            .button-container {
                padding: 1rem;

                .button {
                    cursor: pointer;
                    line-height: 1.5rem;
                    border-radius: 5px;
                    margin-bottom: 1rem;
                    padding: .4rem .8rem;
                    width: 100%;
                    max-width: 380px;
                    text-align: center;
                    color: ${Colors.fontColorLight};
                }

                .default-button-container {
                    .default-button {
                        background: ${Colors.secondary};

                        &:hover {
                            background: ${Colors.secondaryHover};
                        }
                    }
                }

                .accept-button-container {
                    .accept-all-button {
                        background: ${Colors.primary};

                        &:hover {
                            background: ${Colors.primaryHover};
                        }
                    }
                }
            }

            .link-container {
                text-align: center;
                color: ${Colors.fontColorDark};

                a {
                    color: ${Colors.linkColor};

                    :visited {
                        color: ${Colors.linkColor};
                    }
                }
            }
        }
    }

    @media only screen and (min-width: 450px) {
        .inner-overlay {
            .container {
                .button-container {
                    .button {
                        margin: 0 auto 1rem auto;
                    }
                }
            }
        }
    }

    @media only screen and (min-width: 768px) {
        .inner-overlay {
            .container {
                .button-container {
                    .button {

                    }
                }
            }
        }
    }

    @media only screen and (min-width: 1024px) {
        .inner-overlay {
            .container {
                display: flex;
                flex-wrap: wrap;

                .text-container {
                    flex: 2.25;
                }

                .checkbox-container {
                    flex: 1;
                }

                .button-container {
                    flex: 1.25;
                }

                .link-container {
                    flex: unset;
                    width: 100%;
                }
            }
        }
    }
`;

export { CookieConsentStyle };
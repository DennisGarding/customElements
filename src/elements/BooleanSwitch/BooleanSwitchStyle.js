import { css } from 'lit';
import { Colors } from "../../Colors";

export const BooleanSwitchStyle = css`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: sans-serif;
    }

    .boolean-switch-container {
        display: block;
        
        label {
            position: absolute;
            line-height: 1.5rem;
        }

        .boolean-switch {
            position: relative;
            display: inline-block;
            width: 35px;
            height: 20px;
            border: 1px solid ${Colors.border};
            border-radius: 30px;
            cursor: pointer;
            
            .disabled {
                position: absolute;
                border-radius: 30px;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: ${Colors.disabledBackground};
                
                &.hidden {
                    visibility: hidden;
                    position: relative;
                    width: 0;
                    height: 0;
                }
            }

            .boolean-switch-slider {
                position: absolute;
                top: 1px;
                left: 1px;
                height: 16px;
                width: 16px;
                border-radius: 50%;
                background: ${Colors.secondary};
                -webkit-transition: .3s;
                transition: .3s;
                
                &.active {
                    background: ${Colors.primary};
                    transform: translateX(15px);
                }
            }
        }
    }
}
`;

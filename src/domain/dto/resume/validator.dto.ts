import { sendResumeSchema } from "./sendResume.dto";

export class ResumeDtoValidator {
    static validateSendResumeDto( props:unknown ) {
        return sendResumeSchema.parse(props)
    }
}
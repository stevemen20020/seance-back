import { SendResumeDto } from "../../dto/resume/sendResume.dto";

export interface ResumeRepository {
    sendResume(dto:SendResumeDto):Promise <string>
}
import { SendResumeDto } from "../../dto/resume/sendResume.dto";

export interface ResumeDatasource {
    sendResume(dto:SendResumeDto):Promise <string>
}
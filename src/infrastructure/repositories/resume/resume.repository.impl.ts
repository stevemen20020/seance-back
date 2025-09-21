import { ResumeDatasource } from "../../../domain/datasources/resume/resume.datasource";
import { ResumeRepository } from "../../../domain/repositories/resume/resume.repository";
import { SendResumeDto } from "../../../domain/dto/resume/sendResume.dto";


export class ResumeRepositoryImplementation implements ResumeRepository {

    constructor(
        private readonly datasource: ResumeDatasource
    ){}
    sendResume(dto: SendResumeDto): Promise<string> {
        return this.datasource.sendResume(dto)
    }
}
import { JobPosition } from "./job-position.model"

export interface JobApplication {
    id:number
    jobPositionId : number
    jobPosition?: JobPosition
    applicantName : string
    status : string
}

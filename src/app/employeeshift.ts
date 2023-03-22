export interface EmployeeShift {
    Id: string;
    EmployeeName: string;
    StarTimeUtc: Date;
    EndTimeUtc: Date;
    EntryNotes: string;
    TimeWorked: number;
    DeletedOn: Date;
}
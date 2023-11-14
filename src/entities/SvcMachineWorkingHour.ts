import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("svc_machine_working_hour", { schema: "data" })
export class SvcMachineWorkingHour {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", {
    name: "ent",
    nullable: true,
    comment: "회사 id FK(svc_enterprise(id))",
  })
  ent: number | null;

  @Column("int", {
    name: "mid",
    nullable: true,
    comment: "기계 id FK(svc_cnc(id))",
  })
  mid: number | null;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "조업시간 이름",
    length: 45,
  })
  name: string | null;

  @Column("datetime", {
    name: "start",
    nullable: true,
    comment: "시작시간(날짜 전체 입력, 예:YYYY-MM-DD HH:mm)",
  })
  start: Date | null;

  @Column("datetime", {
    name: "end",
    nullable: true,
    comment: "끝시간(날짜 전체 입력, 예:YYYY-MM-DD HH:mm)",
  })
  end: Date | null;

  @Column("text", { name: "comment", nullable: true, comment: "'메모'" })
  comment: string | null;
}

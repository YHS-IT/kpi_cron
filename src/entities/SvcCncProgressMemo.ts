import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcEnterprise } from "./SvcEnterprise";
import { SvcCnc } from "./SvcCnc";

@Index("ent", ["ent"], {})
@Index("mid", ["mid"], {})
@Entity("svc_cnc_progress_memo", { schema: "data" })
export class SvcCncProgressMemo {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "ent", nullable: true })
  ent: number | null;

  @Column("int", { name: "mid", nullable: true })
  mid: number | null;

  @Column("timestamp", { name: "regdate", default: () => "CURRENT_TIMESTAMP" })
  regdate: Date;

  @Column("text", { name: "comment", nullable: true })
  comment: string | null;

  @ManyToOne(
    () => SvcEnterprise,
    (svcEnterprise) => svcEnterprise.svcCncProgressMemos,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "ent", referencedColumnName: "id" }])
  ent2: SvcEnterprise;

  @ManyToOne(() => SvcCnc, (svcCnc) => svcCnc.svcCncProgressMemos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "mid", referencedColumnName: "id" }])
  m: SvcCnc;
}

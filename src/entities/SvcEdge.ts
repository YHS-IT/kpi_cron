import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcCnc } from "./SvcCnc";
import { SvcEnterprise } from "./SvcEnterprise";
import { SvcEdgemachine } from "./SvcEdgemachine";

@Index("fk_ent_idx", ["enterpriseId"], {})
@Entity("svc_edge", { schema: "data" })
export class SvcEdge {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "엣지id " })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    comment: "엣지명",
    length: 20,
  })
  name: string | null;

  @Column("timestamp", {
    name: "connect",
    nullable: true,
    comment: "최근 접속일시",
  })
  connect: Date | null;

  @Column("timestamp", {
    name: "modtime",
    nullable: true,
    comment: "최근 변경일시",
  })
  modtime: Date | null;

  @Column("timestamp", {
    name: "disconnect",
    nullable: true,
    comment: "최근 접속해제일시",
  })
  disconnect: Date | null;

  @Column("int", { name: "enterprise_id", nullable: true, comment: "업체id" })
  enterpriseId: number | null;

  @Column("varchar", {
    name: "status",
    nullable: true,
    comment: "on/off 상태",
    length: 20,
  })
  status: string | null;

  @Column("varchar", {
    name: "ip",
    nullable: true,
    comment: "엣지 접속 ip",
    length: 50,
  })
  ip: string | null;

  @OneToMany(() => SvcCnc, (svcCnc) => svcCnc.edge)
  svcCncs: SvcCnc[];

  @ManyToOne(() => SvcEnterprise, (svcEnterprise) => svcEnterprise.svcEdges, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "enterprise_id", referencedColumnName: "id" }])
  enterprise: SvcEnterprise;

  @OneToMany(() => SvcEdgemachine, (svcEdgemachine) => svcEdgemachine.edge)
  svcEdgemachines: SvcEdgemachine[];
}

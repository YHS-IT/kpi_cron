import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SvcApsNoti } from "./SvcApsNoti";
import { SvcCncProgressMemo } from "./SvcCncProgressMemo";
import { SvcDbRelay } from "./SvcDbRelay";
import { SvcEdge } from "./SvcEdge";
import { SvcMonitor } from "./SvcMonitor";
import { SvcNoti } from "./SvcNoti";
import { SvcUser } from "./SvcUser";

@Index("name_UNIQUE", ["name"], { unique: true })
@Index("idx_name", ["name"], {})
@Entity("svc_enterprise", { schema: "data" })
export class SvcEnterprise {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 20 })
  name: string;

  @Column("varchar", { name: "api", nullable: true, length: 255 })
  api: string | null;

  @Column("varchar", { name: "data_topic", nullable: true, length: 20 })
  dataTopic: string | null;

  @Column("varchar", { name: "websocket", nullable: true, length: 255 })
  websocket: string | null;

  @Column("text", {
    name: "enc_data",
    nullable: true,
    comment: "업체의 각 edge장비들이 GCP에 접속하기 위한 암호화된 cloud key ",
  })
  encData: string | null;

  @Column("varchar", { name: "comment", nullable: true, length: 255 })
  comment: string | null;


  @OneToMany(() => SvcApsNoti, (svcApsNoti) => svcApsNoti.enterprise)
  svcApsNotis: SvcApsNoti[];

  @OneToMany(
    () => SvcCncProgressMemo,
    (svcCncProgressMemo) => svcCncProgressMemo.ent2
  )
  svcCncProgressMemos: SvcCncProgressMemo[];


  @OneToMany(() => SvcDbRelay, (svcDbRelay) => svcDbRelay.enterprise)
  svcDbRelays: SvcDbRelay[];

  @OneToMany(() => SvcEdge, (svcEdge) => svcEdge.enterprise)
  svcEdges: SvcEdge[];

  @OneToMany(() => SvcMonitor, (svcMonitor) => svcMonitor.enterprise)
  svcMonitors: SvcMonitor[];

  @OneToMany(() => SvcNoti, (svcNoti) => svcNoti.enterprise)
  svcNotis: SvcNoti[];

  @OneToMany(() => SvcUser, (svcUser) => svcUser.enterprise)
  svcUsers: SvcUser[];
}

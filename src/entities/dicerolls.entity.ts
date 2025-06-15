import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Profile } from './profile.entity'; // Adjust the path if needed
  
  @Entity('dicerolls')
  export class DiceRoll {
    @PrimaryColumn({ type: 'date', name: 'roll_date' })
    rollDate: Date;
  
    @Column({ type: 'int', name: 'random_seed' })
    randomSeed: number;
  
    @ManyToOne(() => Profile, { nullable: true })
    @JoinColumn({ name: 'daily_id' })
    dailyProfile: Profile;
  
    @ManyToOne(() => Profile, { nullable: true })
    @JoinColumn({ name: 'chall_id' })
    challProfile: Profile;
  }
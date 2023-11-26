import { JobPosition } from './job-position.model';

describe('JobPosition Models', () => {
  fit('JobPosition_Models_should_create_JobPosition_instance_Interface', () => {
    const JobPosition: JobPosition = {
      id: 1,
      title: "title",
      department: 'A',
      location: "state",
      responsibilities: "asd",
      qualifications: "asdf",
      isClosed: true,
      applicationDeadline: new Date('2023-08-30')
    };
    expect(JobPosition).toBeTruthy();
    expect(JobPosition['id']).toBe(1);
    expect(JobPosition['title']).toBe("title");
    expect(JobPosition['department']).toBe('A');
    expect(JobPosition['location']).toBe("state");
    expect(JobPosition['responsibilities']).toBe("asd");
    expect(JobPosition['qualifications']).toBe("asdf");
    expect(JobPosition['applicationDeadline'] instanceof Date).toBe(true);
    expect(JobPosition['isClosed']).toBe(true);
  });

  // it('Week4_Day3_should_create_Player_instance_with_default_values', () => {
  //   const player: Player = {
  //     name: 'Jane',
  //     age: 30
  //   };
  //   expect(player).toBeTruthy();
  //   expect(player.name).toBe('Jane');
  //   expect(player.age).toBe(30);
  //   expect(player.category).toBeUndefined();
  //   expect(player.biddingPrice).toBeUndefined();
  //   expect(player.selectedTeamId).toBeUndefined();
  // });
});

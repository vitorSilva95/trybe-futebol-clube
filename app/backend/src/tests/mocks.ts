const userPayload ={
  id: 1,
  username: "Admin",
  role: "admin",
  password:'$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  email: "admin@admin.com"
}

const loginPayload ={
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com"
}

const clubs = [
    {
      id: 1,
      clubName: "Avaí/Kindermann"
    },
    {
      id: 2,
      clubName: "Bahia"
    },
    {
      id: 3,
      clubName: "Botafogo"
    },
  ]

  const matchsPayload = 
    [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
      },
      {
        id: 41,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
      }
    ]

export { userPayload, clubs, loginPayload, matchsPayload }
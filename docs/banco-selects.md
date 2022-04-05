# Select do Banco

- Agendas do mentor

```sql
select * from schedule s
on mentor m join m.id = s.id_mentor
```

- Agendas do mentorado

```sql
select * from schedule s
on montored m join m.id = s.id_mentored
```

- Agendas do mentorado com um certo mentor

```sql
select * from schedule s
on mentor mr join mr.id = s.id_mentor
on mentored mo join mo.id = s.id_mentored
```
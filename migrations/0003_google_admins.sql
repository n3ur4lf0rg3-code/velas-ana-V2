-- Admin seats claimed by a Grok gate session (not Google) must not keep the atelier.
delete from store_admins
 where user_id not in (
   select "userId" from account where "providerId" = 'grok-google'
 );

import { IconX, IconCheck } from '@tabler/icons-react';
import { Notification, rem } from '@mantine/core';

export default function Succesful() {
  const xIcon = <IconX style={{ width: rem(20), height: rem(20) }} />;
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />;

  return (
    <>
      {/* <Notification icon={xIcon} color="red" title="Bummer!">
        Something went wrong
      </Notification> */}
      <Notification icon={checkIcon} color="teal" title="All good!" mt="md">
        Everything is fine
      </Notification>
    </>
  );
}
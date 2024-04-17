import ForkIcon from "@/assets/ForkIcon";
import StarIcon from "@/assets/StarIcon";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Avatar, AvatarGroup, Chip, Divider, Link } from "@nextui-org/react";
import React from "react";

var HRNumbers = require("human-readable-numbers");

const RepositoryCard = (repo: Repository) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-center">
        <div className="flex gap-3">
          <Avatar
            isBordered
            alt={repo.name}
            radius="sm"
            src={repo.avatar}
            size="md"
          />
          <div className="flex flex-col">
            <p className="text-md font-bold">{repo.name}</p>
            <p className="text-small text-default-500">{repo.author}</p>
          </div>
        </div>
        <AvatarGroup max={3}>
          {repo.builtBy.map((user) => (
            <Avatar
              key={user.username}
              src={user.avatar}
              className="w-6 h-6 text-tiny"
              size="sm"
              name={user.username}
            />
          ))}
        </AvatarGroup>
      </CardHeader>
      <Divider />
      <CardBody>
        {repo.description && <p>{repo.description}</p>}
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2 items-center">
            {repo.language && (
              <Chip>
                <div className="text-small text-default-500 flex gap-1 items-center">
                  {repo.languageColor && (
                    <span style={{ color: repo.languageColor }}>&#9679;</span>
                  )}
                  {repo.language}
                </div>
              </Chip>
            )}
            {repo.stars && (
              <Chip>
                <div className="text-small text-default-500 flex gap-1 items-center">
                  <StarIcon />
                  <p>{HRNumbers.toHumanString(repo.stars)}</p>
                </div>
              </Chip>
            )}
            {repo.forks && (
              <Chip>
                <div className="text-small text-default-500 flex gap-1 items-center">
                  <ForkIcon />
                  <p>{HRNumbers.toHumanString(repo.forks)}</p>
                </div>
              </Chip>
            )}
          </div>
          {repo.currentPeriodStars && (
            <div className="text-xs text-default-500 flex gap-1 items-center">
              <StarIcon />
              <p>
                {HRNumbers.toHumanString(repo.currentPeriodStars)} stars today
              </p>
            </div>
          )}
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <a
          className="text-blue-500 flex items-center gap-2"
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>Visit source code on GitHub</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 font-bold"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </CardFooter>
    </Card>
  );
};

export default RepositoryCard;

#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu};
use tauri_plugin_positioner::{Position, WindowExt};

#[derive(Deserialize, Serialize, Debug)]
#[serde(rename_all = "camelCase")]
struct Repository {
    author: String,
    name: String,
    avatar: String,
    description: Option<String>,
    url: String,
    language: Option<String>,
    language_color: Option<String>,
    stars: Option<i32>,
    forks: Option<i32>,
    current_period_stars: Option<i32>,
    built_by: Vec<BuiltBy>,
}

#[derive(Deserialize, Serialize, Debug)]
struct BuiltBy {
    username: String,
    href: String,
    avatar: String,
}


#[tauri::command]
async fn fetch_trending_repos(language: String) -> Vec<Repository> {
    let url = if language == "all" {
        "https://gtrend.yapie.me/repositories".to_string()
    } else {
        format!("https://gtrend.yapie.me/repositories?language={}&since=daily", language)
    };

    let response = reqwest::get(&url)
        .await
        .expect("Failed to make request")
        .json::<Vec<Repository>>()
        .await
        .expect("Failed to parse response");

    response
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit").accelerator("Cmd+Q");
    let more_apps = CustomMenuItem::new("more_apps".to_string(), "More Apps");
    let about_me = CustomMenuItem::new("about_me".to_string(), "About Me");
    let system_tray_menu = SystemTrayMenu::new()
        .add_item(quit)
        .add_item(more_apps)
        .add_item(about_me);
    
    tauri::Builder::default()
        .plugin(tauri_plugin_positioner::init())
        .system_tray(SystemTray::new().with_menu(system_tray_menu))
        .on_window_event(|event| match event.event() {
            tauri::WindowEvent::Focused(is_focused) => {
                // detect click outside of the focused window and hide the app
                if !is_focused {
                    event.window().hide().unwrap();
                }
            }
            _ => {}
        })
        .on_system_tray_event(|app, event| {
            tauri_plugin_positioner::on_tray_event(app, &event);
            match event {
                SystemTrayEvent::LeftClick {
                    position: _,
                    size: _,
                    ..
                } => {
                    let window = app.get_window("main").unwrap();
                    // use TrayCenter as initial window position
                    let _ = window.move_window(Position::TrayCenter);
                    if window.is_visible().unwrap() {
                        window.hide().unwrap();
                    } else {
                        window.show().unwrap();
                        window.set_focus().unwrap();
                    }
                }
                SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
                    "quit" => {
                        std::process::exit(0);
                    }
                    "more_apps" => {
                        open::that("https://play.google.com/store/apps/dev?id=4730273045676878035")
                            .expect("Failed to open browser");
                    }
                    "about_me" => {
                        open::that("https://ikramhasan.com/").expect("Failed to open browser");
                    }
                    _ => {}
                },
                _ => {}
            }
        })
        .invoke_handler(tauri::generate_handler![fetch_trending_repos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}